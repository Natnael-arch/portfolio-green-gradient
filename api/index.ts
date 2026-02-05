import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes.ts';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
let isInitialized = false;

async function initializeApp() {
    if (!isInitialized) {
        await registerRoutes(httpServer, app);
        isInitialized = true;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await initializeApp();

    // Convert VercelRequest to Express-compatible request
    const expressReq = req as any;
    const expressRes = res as any;

    return app(expressReq, expressRes);
}
