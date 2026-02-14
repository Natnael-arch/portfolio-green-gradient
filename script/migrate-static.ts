import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
// Imports moved to function body for env var loading order

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function migrate() {
    console.log("🚀 Starting migration...");

    // Dynamic imports to ensure dotenv.config() has run
    const { storage } = await import("../api/_lib/storage.js");
    const { uploadToPinata } = await import("../api/_lib/pinata.js");

    // Migrate Projects
    console.log("\n📂 Migrating Projects...");
    const projectsData = JSON.parse(
        await readFile(path.join(ROOT, "client/src/data/projects.json"), "utf-8")
    );

    for (const project of projectsData) {
        console.log(`  - Processing project: ${project.name}`);
        let imageUrl = project.imageUrl;

        if (imageUrl && imageUrl.startsWith("/uploads/")) {
            try {
                const localPath = path.join(ROOT, "client/public", imageUrl);
                const buffer = await readFile(localPath);
                const fileName = path.basename(localPath);
                console.log(`    ⬆️ Uploading ${fileName} to Pinata...`);
                imageUrl = await uploadToPinata(buffer, fileName);
                console.log(`    ✅ Uploaded: ${imageUrl}`);
            } catch (error) {
                console.error(`    ❌ Failed to upload image for ${project.name}:`, error);
            }
        }

        try {
            await storage.createProject({
                name: project.name,
                hackathonName: project.hackathonName,
                hackathonPlacement: project.hackathonPlacement,
                githubLink: project.githubLink,
                liveLink: project.liveLink,
                techStack: project.techStack || [],
                imageUrl: imageUrl,
                contractAddress: project.contractAddress || null,
                explorerLink: project.explorerLink || null,
            });
            console.log(`    ✅ Project ${project.name} inserted into database.`);
        } catch (error) {
            console.error(`    ❌ Failed to insert project ${project.name}:`, error);
        }
    }

    // Migrate Certificates
    console.log("\n📜 Migrating Certificates...");
    const certsData = JSON.parse(
        await readFile(path.join(ROOT, "client/src/data/certificates.json"), "utf-8")
    );

    for (const cert of certsData) {
        console.log(`  - Processing certificate: ${cert.name}`);
        let imageUrl = cert.imageUrl;

        if (imageUrl && imageUrl.startsWith("/uploads/")) {
            try {
                const localPath = path.join(ROOT, "client/public", imageUrl);
                const buffer = await readFile(localPath);
                const fileName = path.basename(localPath);
                console.log(`    ⬆️ Uploading ${fileName} to Pinata...`);
                imageUrl = await uploadToPinata(buffer, fileName);
                console.log(`    ✅ Uploaded: ${imageUrl}`);
            } catch (error) {
                console.error(`    ❌ Failed to upload image for ${cert.name}:`, error);
            }
        }

        try {
            await storage.createCertificate({
                name: cert.name,
                issuingOrganization: cert.issuingOrganization,
                issueDate: cert.issueDate,
                link: cert.link,
                imageUrl: imageUrl,
            });
            console.log(`    ✅ Certificate ${cert.name} inserted into database.`);
        } catch (error) {
            console.error(`    ❌ Failed to insert certificate ${cert.name}:`, error);
        }
    }

    console.log("\n✨ Migration complete!");
    process.exit(0);
}

migrate().catch((err) => {
    console.error("💥 Migration failed:", err);
    process.exit(1);
});
