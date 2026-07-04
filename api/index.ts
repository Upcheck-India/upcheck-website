import express from "express";
import { registerRoutes } from "../server/routes";
import clientPromise from "../lib/mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to capture and log API requests (similar to server/index.ts)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    let logLine = `[Serverless] ${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }
    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }
    console.log(logLine);
  });

  next();
});

let initialized = false;
const initApp = async () => {
  if (!initialized) {
    // Wait for MongoDB to connect
    await clientPromise;
    console.log("MongoDB connected in serverless function");
    
    // Register the routes
    await registerRoutes(app);
    initialized = true;
  }
};

export default async (req: any, res: any) => {
  try {
    await initApp();
    // Pass the request and response objects to Express
    app(req, res);
  } catch (error) {
    console.error("Failed to handle request in serverless function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
