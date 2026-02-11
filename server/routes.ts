import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertCertificateSchema } from "../shared/schema";
import multer from "multer";
import { uploadToPinata } from "./pinata";
import express from "express";

// Use memory storage to process files before uploading to Pinata
const upload = multer({ storage: multer.memoryStorage() });

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Health Check API
  app.get("/api/health", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json({
        status: "ok",
        database: "connected",
        projectCount: projects.length,
        env: {
          DATABASE_URL: !!process.env.DATABASE_URL,
          POSTGRES_URL: !!process.env.POSTGRES_URL,
          PINATA_JWT: !!process.env.PINATA_JWT,
          ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD
        }
      });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({
        status: "error",
        message: "Database connection failed",
        error: String(error)
      });
    }
  });

  // File Upload API
  app.post("/api/upload", upload.single("file"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log(`Uploading file: ${req.file.originalname}`);
      const ipfsUrl = await uploadToPinata(req.file.buffer, req.file.originalname);
      console.log(`File uploaded to Pinata: ${ipfsUrl}`);

      res.json({ url: ipfsUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Admin login
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    console.log("Login attempt received.");
    if (password === ADMIN_PASSWORD) {
      console.log("Login successful.");
      res.json({ success: true });
    } else {
      console.error(`Login failed: Invalid password.`);
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
