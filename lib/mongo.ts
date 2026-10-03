import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

// Extend the global type to include our MongoDB client promise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

/**
 * Connect to MongoDB on first use. The server can boot without MONGODB_URI
 * (e.g. local development without the database) — callers get a clear
 * per-call error instead of the process dying at import time.
 */
export default function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured — set it in .env.local to use database-backed routes."
    );
  }
  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise ??= new MongoClient(uri, {}).connect();
    return global._mongoClientPromise;
  }
  clientPromise ??= new MongoClient(uri, {}).connect();
  return clientPromise;
}
