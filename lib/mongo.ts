// src/lib/mongodb.ts
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

const uri: string = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend the global type to include our MongoDB client promise
declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;