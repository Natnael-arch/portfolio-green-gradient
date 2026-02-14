import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_lib/storage.js';
import { insertProjectSchema } from '../../shared/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method === 'GET') {
            const projects = await storage.getProjects();
            return res.json(projects);
        }

        if (req.method === 'POST') {
            const parsed = insertProjectSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: parsed.error.message });
            }
            const project = await storage.createProject(parsed.data);
            return res.status(201).json(project);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error("Projects API error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
