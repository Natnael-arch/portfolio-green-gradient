import { writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  type Project,
  type Certificate,
  type InsertProject,
  type InsertCertificate,
} from "../shared/schema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_PATH = path.resolve(__dirname, "../client/src/data/projects.json");
const CERTS_PATH = path.resolve(__dirname, "../client/src/data/certificates.json");

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

export class FileStorage implements IStorage {
  private async readData<T>(filePath: string): Promise<T[]> {
    try {
      const content = await readFile(filePath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  private async writeData<T>(filePath: string, data: T[]): Promise<void> {
    await writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async getProjects(): Promise<Project[]> {
    return this.readData<Project>(PROJECTS_PATH);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const projects = await this.getProjects();
    const id = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const newProject: Project = {
      id,
      name: project.name,
      hackathonName: project.hackathonName ?? null,
      hackathonPlacement: project.hackathonPlacement ?? null,
      githubLink: project.githubLink ?? null,
      liveLink: project.liveLink ?? null,
      techStack: project.techStack || [],
      imageUrl: project.imageUrl ?? null,
      createdAt: new Date(),
    };
    projects.push(newProject);
    await this.writeData(PROJECTS_PATH, projects);
    return newProject;
  }

  async deleteProject(id: number): Promise<void> {
    const projects = await this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    await this.writeData(PROJECTS_PATH, filtered);
  }

  async getCertificates(): Promise<Certificate[]> {
    return this.readData<Certificate>(CERTS_PATH);
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const certs = await this.getCertificates();
    return certs.find((c) => c.id === id);
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const certs = await this.getCertificates();
    const id = certs.length > 0 ? Math.max(...certs.map((c) => c.id)) + 1 : 1;
    const newCert: Certificate = {
      id,
      name: certificate.name,
      issuingOrganization: certificate.issuingOrganization,
      issueDate: certificate.issueDate,
      link: certificate.link ?? null,
      imageUrl: certificate.imageUrl ?? null,
      createdAt: new Date()
    };
    certs.push(newCert);
    await this.writeData(CERTS_PATH, certs);
    return newCert;
  }

  async deleteCertificate(id: number): Promise<void> {
    const certs = await this.getCertificates();
    const filtered = certs.filter((c) => c.id !== id);
    await this.writeData(CERTS_PATH, filtered);
  }
}

export const storage = new FileStorage();

export async function seedDatabase() {
  // Seeding is no longer necessary as we use local JSON files
  console.log("Using static JSON storage.");
}

