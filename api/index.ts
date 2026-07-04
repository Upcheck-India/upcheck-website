import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";

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

// GET /api/posts
app.get("/api/posts", async (req, res) => {
  try {
    const client = await getClientPromise();
    const db = client.db("resources");
    const posts = await db
      .collection("website-resource")
      .find({})
      .sort({ publishedAt: -1 })
      .toArray();
    res.json(posts);
  } catch (e) {
    console.error("Failed to fetch posts:", e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /api/posts/:id
app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await getClientPromise();
    const db = client.db("resources");

    // Try string id first
    let post = await db.collection("website-resource").findOne({ id });

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

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (e) {
    console.error("Failed to fetch post:", e);
    return res.status(500).json({ error: "Failed to fetch post" });
  }
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
