import type { Express } from "express";
import { createServer, type Server } from "http";
import { ObjectId, GridFSBucket } from "mongodb";
import clientPromise from "../lib/mongo"; // import MongoDB clientPromise

export async function registerRoutes(app: Express): Promise<Server> {
  // Register GET /api/posts route
  app.get("/api/posts", async (req, res) => {
    try {
      const client = await clientPromise;
      const db = client.db("resources");
      const posts = await db
        .collection("website-resource")
        .find({})
        .sort({ publishedAt: -1 }) // newest first
        .toArray();
      res.json(posts);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch posts" });
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