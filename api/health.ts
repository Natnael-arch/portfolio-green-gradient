import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_lib/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
}
