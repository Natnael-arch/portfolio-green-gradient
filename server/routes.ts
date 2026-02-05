import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage, seedDatabase } from "./storage.ts";
import { insertProjectSchema, insertCertificateSchema } from "../shared/schema.ts";
import multer from "multer";
import path from "path";
import fs from "fs";

import express from "express";

const storage_config = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.resolve(process.cwd(), "client/public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage_config });

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Initialize database and seed data
  await seedDatabase();

  // Serve uploaded files statically
  app.use("/uploads", express.static(path.resolve(process.cwd(), "client/public/uploads")));

  // File Upload API
  app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const relativePath = `/uploads/${req.file.filename}`;
    res.json({ url: relativePath });
  });

  // Admin login
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    console.log("Login attempt received.");
    if (password === ADMIN_PASSWORD) {
      console.log("Login successful.");
      res.json({ success: true });
    } else {
      console.error(`Login failed: Invalid password.Expected: ${ADMIN_PASSWORD ? "****" : "undefined"} `);
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // Projects API
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const parsed = insertProjectSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const project = await storage.createProject(parsed.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Certificates API
  app.get("/api/certificates", async (_req, res) => {
    try {
      const certificates = await storage.getCertificates();
      res.json(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ error: "Failed to fetch certificates" });
    }
  });

  app.post("/api/certificates", async (req, res) => {
    try {
      const parsed = insertCertificateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const certificate = await storage.createCertificate(parsed.data);
      res.status(201).json(certificate);
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(500).json({ error: "Failed to create certificate" });
    }
  });

  app.delete("/api/certificates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid certificate ID" });
      }
      await storage.deleteCertificate(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      res.status(500).json({ error: "Failed to delete certificate" });
    }
  });

  return httpServer;
}
