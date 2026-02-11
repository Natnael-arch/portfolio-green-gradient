import "dotenv/config";
import { db } from "./server/db";
import { sql } from "drizzle-orm";

async function testConnection() {
    console.log("Testing database connection...");
    console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);

    if (process.env.DATABASE_URL) {
        // Log masked version to verify it's correctly loaded
        const url = process.env.DATABASE_URL;
        console.log("DATABASE_URL format:", url.substring(0, 15) + "..." + url.substring(url.length - 10));
    }

    try {
        const result = await db.execute(sql`SELECT NOW()`);
        console.log("Connection successful!");
        console.log("Server time:", result.rows[0]);
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

testConnection();
