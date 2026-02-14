import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_lib/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id: idParam } = req.query;
    const id = parseInt(idParam as string, 10);

    try {
        if (req.method === 'DELETE') {
            if (isNaN(id)) {
                return res.status(400).json({ error: "Invalid certificate ID" });
            }
            await storage.deleteCertificate(id);
            return res.status(204).end();
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error("Certificate ID API error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
