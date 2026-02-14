import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_lib/storage.js';
import { insertCertificateSchema } from '../../shared/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method === 'GET') {
            const certificates = await storage.getCertificates();
            return res.json(certificates);
        }

        if (req.method === 'POST') {
            const parsed = insertCertificateSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: parsed.error.message });
            }
            const certificate = await storage.createCertificate(parsed.data);
            return res.status(201).json(certificate);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error("Certificates API error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
