import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // On Vercel, static files are served natively. 
  // We only need this for local production testing.
  if (process.env.VERCEL) return;

  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    // If we're not on Vercel and dist/public doesn't exist, we should warn
    // but maybe not crash immediately in some environments
    console.warn(`Warning: Static directory not found at ${distPath}`);
    return;
  }

  app.use(express.static(distPath));

  // Handle SPA routing: fall through to index.html
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
