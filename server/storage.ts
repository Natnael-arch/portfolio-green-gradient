import { drizzle } from "drizzle-orm/node-postgres";
import { eq, desc } from "drizzle-orm";
import pkg from "pg";
const { Pool } = pkg;
import {
  projects,
  certificates,
  type Project,
  type Certificate,
  type InsertProject,
  type InsertCertificate,
} from "@shared/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

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
    return db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return result[0];
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async getCertificates(): Promise<Certificate[]> {
    return db.select().from(certificates).orderBy(desc(certificates.createdAt));
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const result = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, id))
      .limit(1);
    return result[0];
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const result = await db.insert(certificates).values(certificate).returning();
    return result[0];
  }

  async deleteCertificate(id: number): Promise<void> {
    await db.delete(certificates).where(eq(certificates.id, id));
  }
}

export const storage = new DatabaseStorage();

export async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  const existingCertificates = await storage.getCertificates();

  if (existingProjects.length === 0) {
    const sampleProjects: InsertProject[] = [
      {
        name: "DeFi Swap Protocol",
        hackathonName: "ETHGlobal Paris 2024",
        hackathonPlacement: "1st Place",
        githubLink: "https://github.com/example/defi-swap",
        liveLink: "https://defi-swap-demo.vercel.app",
        techStack: ["Solidity", "React", "Ethers.js", "Hardhat", "TheGraph"],
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "NFT Marketplace",
        hackathonName: "Chainlink Hackathon",
        hackathonPlacement: "Best Use of Chainlink",
        githubLink: "https://github.com/example/nft-market",
        liveLink: "https://nft-market-demo.vercel.app",
        techStack: ["Solidity", "Next.js", "IPFS", "Chainlink VRF"],
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Cross-Chain Bridge",
        hackathonName: null,
        hackathonPlacement: null,
        githubLink: "https://github.com/example/bridge",
        liveLink: "https://cross-chain-bridge.io",
        techStack: ["Rust", "Solidity", "LayerZero", "React"],
        imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "DAO Governance Platform",
        hackathonName: "ETHDenver 2024",
        hackathonPlacement: "Top 10 Finalist",
        githubLink: "https://github.com/example/dao-platform",
        liveLink: null,
        techStack: ["Solidity", "TypeScript", "Snapshot", "Safe"],
        imageUrl: null,
      },
      {
        name: "Yield Aggregator",
        hackathonName: null,
        hackathonPlacement: null,
        githubLink: "https://github.com/example/yield-agg",
        liveLink: "https://yield-aggregator.finance",
        techStack: ["Solidity", "Python", "Brownie", "Aave", "Compound"],
        imageUrl: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop&q=60",
      },
    ];

    for (const project of sampleProjects) {
      await storage.createProject(project);
    }
  }

  if (existingCertificates.length === 0) {
    const sampleCertificates: InsertCertificate[] = [
      {
        name: "Certified Ethereum Developer",
        issuingOrganization: "Blockchain Council",
        issueDate: "December 2024",
        link: "https://verify.blockchain-council.org/cert/12345",
        imageUrl: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Solidity Security Expert",
        issuingOrganization: "ConsenSys Academy",
        issueDate: "October 2024",
        link: "https://consensys.net/verify/67890",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "DeFi Protocol Engineering",
        issuingOrganization: "Alchemy University",
        issueDate: "August 2024",
        link: "https://alchemy.com/cert/abcdef",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Smart Contract Auditor",
        issuingOrganization: "OpenZeppelin",
        issueDate: "June 2024",
        link: null,
        imageUrl: null,
      },
    ];

    for (const cert of sampleCertificates) {
      await storage.createCertificate(cert);
    }
  }
}
