import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import clientPromise from "../lib/mongo.js";  // Import the Mongo client promise

const app = express();
app.set("trust proxy", 1);

// Secure app with Helmet HTTP headers (with customized CSP for Vite dev server compatibility)
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "development" ? false : undefined
}));

// CORS Configuration to restrict access to trusted origins only
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = [
      "http://localhost:4000",
      "http://127.0.0.1:4000",
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ];
    if (allowed.includes(origin) || origin.endsWith(".gitpod.io") || origin.endsWith(".repl.co")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assets from client/public/attached_assets (single source of truth)
app.use("/attached_assets", express.static("client/public/attached_assets"));

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
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Await MongoDB connection before proceeding
    const client = await clientPromise;
    log("MongoDB connected");

    // Now register your API routes
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = parseInt(process.env.PORT || "4000", 10);
    server.listen(
      {
        port,
        host: "127.0.0.1",
      },
      () => {
        log(`serving on port ${port}`);
      }
    );
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1); // Exit if MongoDB connection or server start fails
  }
})();
