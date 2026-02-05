import { storage } from "./server/storage.ts";

async function test() {
    console.log("Projects:", (await storage.getProjects()).length);
    console.log("Certificates:", (await storage.getCertificates()).length);

    await storage.createProject({
        name: "Test Project",
        techStack: ["Test"],
    });

    console.log("Projects after add:", (await storage.getProjects()).length);
}

test().catch(console.error);
