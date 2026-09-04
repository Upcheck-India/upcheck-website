import type { Express } from "express";
import { createServer, type Server } from "http";
import { ObjectId, GridFSBucket } from "mongodb";
import clientPromise from "../lib/mongo"; // import MongoDB clientPromise
import rateLimit from "express-rate-limit";
import { z } from "zod";

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
  // Strip HTML tag syntax
  let cleaned = str.replace(/<[^>]*>/g, "");
  // Escape HTML entities to prevent execution
  cleaned = cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
  return cleaned.trim();
}

import localPosts from "../client/src/pages/posts.json";

let cachedPosts: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

async function getPostsWithCache(): Promise<any[]> {
  const now = Date.now();
  if (cachedPosts && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPosts;
  }

  try {
    // 2.5 second timeout so user never waits for slow MongoDB connection
    const fetchPromise = (async () => {
      const client = await clientPromise;
      const db = client.db("resources");
      return await db
        .collection("website-resource")
        .find({})
        .sort({ publishedAt: -1 })
        .toArray();
    })();

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("MongoDB query timeout")), 2500)
    );

    const posts = await Promise.race([fetchPromise, timeoutPromise]);
    if (posts && Array.isArray(posts) && posts.length > 0) {
      cachedPosts = posts;
      lastFetchTime = now;
      return cachedPosts;
    }
  } catch (err) {
    console.warn("MongoDB fetch failed or timed out, serving fast cached/local posts:", err);
  }

  return cachedPosts || (localPosts as any[]);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register GET /api/posts route
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await getPostsWithCache();
      res.json(posts);
    } catch (e) {
      console.error(e);
      res.json(localPosts);
    }
  });

  // Register GET /api/posts/:id route
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching post with id:", id);
      
      const client = await clientPromise;
      const db = client.db("resources");

      // First try to find by string id
      let post = await db
        .collection("website-resource")
        .findOne({ id: id });

      // If not found, try to find by ObjectId
      if (!post) {
        try {
          post = await db.collection("website-resource").findOne({
            _id: new ObjectId(id),
          });
        } catch (error) {
          console.error("Invalid ObjectId format:", error);
        }
      }

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.json(post);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Register POST /api/feedback route with security middleware
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

      console.log("Sanitized feedback received:", { 
        name: sanitizedName, 
        email: sanitizedEmail, 
        farmName: sanitizedFarmName, 
        location: sanitizedLocation, 
        rating: validatedData.rating, 
        feedback: sanitizedFeedback 
      });

      const client = await clientPromise;
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
      // Secure error handling to avoid leaking database/system internals
      res.status(500).json({ error: "An unexpected error occurred while saving your feedback. Please try again." });
    }
  });

  // Register GET /api/media/:id route to serve GridFS files
  app.get("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const client = await clientPromise;
      const db = client.db("resources");

      let objId: ObjectId;
      try {
        objId = new ObjectId(id);
      } catch (err) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const bucket = new GridFSBucket(db);

      // Check if file exists in database metadata
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

  // Create and return server with routes
  const httpServer = createServer(app);
  return httpServer;
}