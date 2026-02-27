import { NewLink, Link, linksTable } from "@/db/schema.js";
import { ILinks } from "./links.interface.js";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { asc, eq, sql } from "drizzle-orm";


export class LinkRepository implements ILinks {
    constructor(private db: NodePgDatabase) { }

    async createLink(data: NewLink): Promise<Link> {
        const [link] = await this.db.insert(linksTable).values(data).returning()
        return link
    };
    async findByShortUrl(shortUrl: string): Promise<Link | null> {
        const [link] = await this.db.select().from(linksTable).where(eq(linksTable.shortUrl, shortUrl))
        return link ?? null
    }
    async findById(id: string): Promise<Link | null> {
        const [link] = await this.db.select().from(linksTable).where(eq(linksTable.id, id))
        return link ?? null
    }
    async findAll(): Promise<Link[]> {
        return await this.db.select().from(linksTable).orderBy(asc(linksTable.createdAt))
    }
    async deleteById(id: string): Promise<void> {
        await this.db.delete(linksTable).where(eq(linksTable.id, id))
    }
    async incrementAccessCount(id: string): Promise<void> {
        await this.db.update(linksTable).set({ accessCount: sql`${linksTable.accessCount} + 1` }).where(eq(linksTable.id, id))
    }

}