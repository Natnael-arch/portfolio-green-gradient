import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body;
    const adminPasswordEnv = process.env.ADMIN_PASSWORD;

    console.log("Login attempt received.");

    if (!adminPasswordEnv) {
        console.error("Login failed: ADMIN_PASSWORD environment variable is missing.");
        return res.status(500).json({ error: "Server misconfiguration." });
    }

    const enteredPasswordTrimmed = (password || "").trim();
    const storedPasswordTrimmed = adminPasswordEnv.trim();

    const isMatch = enteredPasswordTrimmed === storedPasswordTrimmed;

    if (isMatch) {
        console.log("Login successful.");
        res.json({ success: true });
    } else {
        console.error("Login failed: Invalid password.");
        res.status(401).json({ error: "Invalid password" });
    }
}
