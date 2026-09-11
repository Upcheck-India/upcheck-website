import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { MongoClient, GridFSBucket } from "mongodb";

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

export default function handler(req: Request, res: Response) {
  return app(req as any, res as any);
}
