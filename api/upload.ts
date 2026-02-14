import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingForm, File as FormidableFile } from 'formidable';
import { readFile } from 'node:fs/promises';
import { uploadToPinata } from './_lib/pinata.js';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Form parsing error:", err);
            return res.status(500).json({ error: "Failed to parse form data" });
        }

        const file = files.file;
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // formidable might return an array or a single file
        const uploadedFile = Array.isArray(file) ? file[0] : file;

        try {
            const buffer = await readFile(uploadedFile.filepath);
            const ipfsUrl = await uploadToPinata(buffer, uploadedFile.originalFilename || "upload");

            res.json({ url: ipfsUrl });
        } catch (uploadError) {
            console.error("Upload error:", uploadError);
            res.status(500).json({ error: "Failed to upload file to Pinata" });
        }
    });
}
