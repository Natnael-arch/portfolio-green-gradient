import {
    type Project,
    type Certificate,
    type InsertProject,
    type InsertCertificate,
    projects,
    certificates,
} from "../../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

export interface IStorage {
    getProjects(): Promise<Project[]>;
    getProject(id: number): Promise<Project | undefined>;
    createProject(project: InsertProject): Promise<Project>;
    deleteProject(id: number): Promise<void>;

    getCertificates(): Promise<Certificate[]>;
    getCertificate(id: number): Promise<Certificate | undefined>;
    createCertificate(certificate: InsertCertificate): Promise<Certificate>;
    deleteCertificate(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
    async getProjects(): Promise<Project[]> {
        return await db.select().from(projects).orderBy(projects.createdAt);
    }

    async getProject(id: number): Promise<Project | undefined> {
        const [project] = await db.select().from(projects).where(eq(projects.id, id));
        return project;
    }

    async createProject(insertProject: InsertProject): Promise<Project> {
        const [project] = await db
            .insert(projects)
            .values({
                ...insertProject,
                createdAt: new Date(),
            })
            .returning();
        return project;
    }

    async deleteProject(id: number): Promise<void> {
        await db.delete(projects).where(eq(projects.id, id));
    }

    async getCertificates(): Promise<Certificate[]> {
        return await db.select().from(certificates).orderBy(certificates.createdAt);
    }

    async getCertificate(id: number): Promise<Certificate | undefined> {
        const [certificate] = await db
            .select()
            .from(certificates)
            .where(eq(certificates.id, id));
        return certificate;
    }

    async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
        const [certificate] = await db
            .insert(certificates)
            .values({
                ...insertCertificate,
                createdAt: new Date(),
            })
            .returning();
        return certificate;
    }

    async deleteCertificate(id: number): Promise<void> {
        await db.delete(certificates).where(eq(certificates.id, id));
    }
}

export const storage = new DatabaseStorage();
