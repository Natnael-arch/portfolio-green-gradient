import "dotenv/config";
import { uploadToPinata } from "./server/pinata";
import fs from "fs/promises";
import path from "path";

async function testUpload() {
    console.log("Testing Pinata upload...");

    if (!process.env.PINATA_JWT) {
        console.error("PINATA_JWT not found in environment.");
        return;
    }

    console.log("PINATA_JWT found (first 10 chars):", process.env.PINATA_JWT.substring(0, 10));

    try {
        // Create a dummy buffer
        const buffer = Buffer.from("Hello Pinata, this is a test upload!", "utf-8");
        const fileName = "test-upload-" + Date.now() + ".txt";

        const url = await uploadToPinata(buffer, fileName);
        console.log("Upload successful!");
        console.log("URL:", url);
    } catch (error) {
        console.error("Upload failed:", error);
    }
}

testUpload();
