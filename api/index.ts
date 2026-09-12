import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { MongoClient, GridFSBucket } from "mongodb";
import rateLimit from "express-rate-limit";
import { z } from "zod";

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

// Vercel terminates TLS and proxies, so the client IP arrives in x-forwarded-for.
// Without this, express-rate-limit buckets every request under the proxy IP and
// would rate-limit all users as one.
app.set("trust proxy", 1);

// Cap body size. The only POST takes a short feedback form; anything larger is
// either a mistake or an attempt to exhaust memory.
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

/**
 * Rate limiting.
 *
 * Caveat worth knowing: express-rate-limit's default store is in-memory, and on
 * serverless each cold instance starts with an empty bucket. Fluid Compute reuses
 * instances so this does bite casual abuse and accidental request storms, but it
 * is not a hard guarantee across a distributed fleet. For a real ceiling, enable
 * rate limiting in the Vercel Firewall (WAF) at the platform edge — that runs
 * before the function is ever invoked, so it also protects your compute bill.
 */
const limiter = (max: number, windowMs: number, message: string) =>
  rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });

// Read endpoints: generous, but bounded so a scraper cannot hammer MongoDB.
const readLimiter = limiter(
  120,
  60 * 1000,
  "Too many requests. Please slow down and try again shortly."
);

// Media streams straight out of GridFS, so it is the most expensive read.
const mediaLimiter = limiter(
  60,
  60 * 1000,
  "Too many media requests. Please try again shortly."
);

// Writes: tight, since this is the only endpoint that persists user input.
const feedbackLimiter = limiter(
  5,
  15 * 60 * 1000,
  "Too many feedback submissions from this IP. Please try again after 15 minutes."
);

app.use("/api/", readLimiter);

import localPosts from "../client/src/pages/posts.json";

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

// GET /api/media/:id
app.get("/api/media/:id", mediaLimiter, async (req, res) => {
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
    res.setHeader("Content-Type", file.contentType || "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    const downloadStream = bucket.openDownloadStream(objId);
    downloadStream.on("data", (chunk) => {
      res.write(chunk);
    });
    downloadStream.on("error", (err) => {
      console.error("GridFS download error:", err);
      res.status(404).end();
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } catch (e) {
    console.error("Failed to fetch media:", e);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

// POST /api/feedback
// Mirrors the handler in server/routes.ts. Vercel rewrites every /api/* request to
// this file, so a route that lives only in server/routes.ts 404s in production.
const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(100, "Email is too long"),
  farmName: z.string().max(100, "Farm name is too long").optional().or(z.literal("")),
  location: z.string().max(100, "Location is too long").optional().or(z.literal("")),
  rating: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5")
  ),
  feedback: z.string().min(1, "Feedback message is required").max(2000, "Feedback is too long"),
});

function sanitizeInput(str: string): string {
  if (typeof str !== "string") return str;
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

app.post("/api/feedback", feedbackLimiter, async (req, res) => {
  try {
    const parseResult = feedbackSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const data = parseResult.data;
    const client = await getClientPromise();
    const db = client.db("resources");

    const result = await db.collection("feedback").insertOne({
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      farmName: data.farmName ? sanitizeInput(data.farmName) : "",
      location: data.location ? sanitizeInput(data.location) : "",
      rating: data.rating,
      feedback: sanitizeInput(data.feedback),
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error("Failed to save feedback:", e);
    res.status(500).json({
      error: "An unexpected error occurred while saving your feedback. Please try again.",
    });
  }
});

export default function handler(req: Request, res: Response) {
  return app(req as any, res as any);
}
