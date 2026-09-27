import express, { Request, Response } from "express";
import { ObjectId, MongoClient, GridFSBucket } from "mongodb";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const localPosts = require("../client/src/pages/posts.json");

// Inline mongo connection (avoids dotenv issues in serverless)
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI environment variable is not set");
}

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not defined");
  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

// Rate limiting middleware to prevent spam on feedback submission
const feedbackRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 feedback submissions per 15 minutes
  message: {
    error: "Too many feedback submissions from this IP. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Zod Validation Schema for request validation
const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(100, "Email is too long"),
  farmName: z.string().max(100, "Farm name is too long").optional().or(z.literal("")),
  location: z.string().max(100, "Location is too long").optional().or(z.literal("")),
  rating: z.preprocess((val) => Number(val), z.number().int().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5")),
  feedback: z.string().min(1, "Feedback message is required").max(2000, "Feedback is too long"),
});

// HTML Input Sanitizer & XSS Protection helper function
function sanitizeInput(str: string): string {
  if (typeof str !== "string") return str;
  let cleaned = str.replace(/<[^>]*>/g, "");
  cleaned = cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
  return cleaned.trim();
}

let cachedPosts: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// GET /api/posts
app.get("/api/posts", async (req, res) => {
  const now = Date.now();
  if (cachedPosts && now - lastFetchTime < CACHE_TTL_MS) {
    return res.json(cachedPosts);
  }

  try {
    const fetchPromise = (async () => {
      const client = await getClientPromise();
      const db = client.db("resources");
      return await db
        .collection("website-resource")
        .find({})
        .sort({ publishedAt: -1 })
        .toArray();
    })();

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 4000)
    );

    const posts = await Promise.race([fetchPromise, timeoutPromise]);
    if (posts && Array.isArray(posts) && posts.length > 0) {
      cachedPosts = posts;
      lastFetchTime = now;
      return res.json(cachedPosts);
    }
  } catch (e) {
    console.error("Failed to fetch posts from MongoDB, serving fallback:", e);
  }

  return res.json(cachedPosts || localPosts);
});

// GET /api/posts/:id
app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let post: any = null;

    try {
      const client = await getClientPromise();
      const db = client.db("resources");

      // Try string id first
      post = await db.collection("website-resource").findOne({ id });

      // Try numeric id
      if (!post && !isNaN(Number(id))) {
        post = await db.collection("website-resource").findOne({ id: Number(id) });
      }

      // Fallback to ObjectId
      if (!post) {
        try {
          post = await db
            .collection("website-resource")
            .findOne({ _id: new ObjectId(id) });
        } catch {
          // Invalid ObjectId format, ignore
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB fetch error in serverless, falling back to local posts:", dbErr);
    }

    // Fallback to localPosts
    if (!post) {
      post = (localPosts as any[]).find(
        (p: any) =>
          String(p.id) === String(id) ||
          String(p._id) === String(id) ||
          (!isNaN(Number(id)) && Number(p.id) === Number(id))
      );
    }

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (e) {
    console.error("Failed to fetch post:", e);
    const post = (localPosts as any[]).find(
      (p: any) =>
        String(p.id) === String(req.params.id) ||
        String(p._id) === String(req.params.id) ||
        (!isNaN(Number(req.params.id)) && Number(p.id) === Number(req.params.id))
    );
    if (post) return res.json(post);
    return res.status(500).json({ error: "Failed to fetch post" });
  }
});

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif"
];

// GET /api/media/:id
app.get("/api/media/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await getClientPromise();
    const db = client.db("resources");

    let objId: ObjectId;
    try {
      objId = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const bucket = new GridFSBucket(db);

    // Check if the file exists in metadata
    const files = await db.collection("fs.files").find({ _id: objId }).toArray();
    if (files.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    const file = files[0];
    const contentType = (file.contentType || "").toLowerCase();
    if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    const downloadStream = bucket.openDownloadStream(objId);
    downloadStream.on("data", (chunk) => {
      res.write(chunk);
    });
    downloadStream.on("error", (err) => {
      console.error("GridFS download error:", err);
      if (res.headersSent) {
        res.destroy();
      } else {
        res.status(404).json({ error: "File not found" });
      }
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } catch (e) {
    console.error("Failed to fetch media:", e);
    if (res.headersSent) {
      res.destroy();
    } else {
      res.status(500).json({ error: "Failed to fetch media" });
    }
  }
});

// POST /api/feedback
app.post("/api/feedback", feedbackRateLimiter, async (req, res) => {
  try {
    // 1. Request Structure & Type Validation
    const parseResult = feedbackSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors
      });
    }

    const validatedData = parseResult.data;

    // 2. Input Sanitization & XSS Protection
    const sanitizedName = sanitizeInput(validatedData.name);
    const sanitizedEmail = sanitizeInput(validatedData.email);
    const sanitizedFarmName = validatedData.farmName ? sanitizeInput(validatedData.farmName) : "";
    const sanitizedLocation = validatedData.location ? sanitizeInput(validatedData.location) : "";
    const sanitizedFeedback = sanitizeInput(validatedData.feedback);

    const client = await getClientPromise();
    const db = client.db("resources");

    const result = await db.collection("feedback").insertOne({
      name: sanitizedName,
      email: sanitizedEmail,
      farmName: sanitizedFarmName,
      location: sanitizedLocation,
      rating: validatedData.rating,
      feedback: sanitizedFeedback,
      createdAt: new Date()
    });

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error("Failed to save feedback securely:", e);
    res.status(500).json({ error: "An unexpected error occurred while saving your feedback. Please try again." });
  }
});

export default function handler(req: Request, res: Response) {
  return app(req as any, res as any);
}
