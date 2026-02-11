import "dotenv/config";
import { db } from "./db";
import { projects, certificates } from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
    console.log("Seeding database...");

    try {
        // Seed Projects
        const projectsPath = path.resolve(__dirname, "../client/src/data/projects.json");
        const projectsData = JSON.parse(await fs.readFile(projectsPath, "utf-8"));

        if (projectsData.length > 0) {
            console.log(`Found ${projectsData.length} projects to seed.`);
            for (const p of projectsData) {
                await db.insert(projects).values({
                    name: p.name,
                    hackathonName: p.hackathonName,
                    hackathonPlacement: p.hackathonPlacement,
                    githubLink: p.githubLink,
                    liveLink: p.liveLink,
                    techStack: p.techStack,
                    imageUrl: p.imageUrl,
                    createdAt: new Date(p.createdAt || Date.now()),
                });
            }
            console.log("Projects seeded.");
        }

        // Seed Certificates
        const certsPath = path.resolve(__dirname, "../client/src/data/certificates.json");
        const certsData = JSON.parse(await fs.readFile(certsPath, "utf-8"));

        if (certsData.length > 0) {
            console.log(`Found ${certsData.length} certificates to seed.`);
            for (const c of certsData) {
                await db.insert(certificates).values({
                    name: c.name,
                    issuingOrganization: c.issuingOrganization,
                    issueDate: c.issueDate,
                    link: c.link,
                    imageUrl: c.imageUrl,
                    createdAt: new Date(c.createdAt || Date.now()),
                });
            }
            console.log("Certificates seeded.");
        }

        console.log("Seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seed();
