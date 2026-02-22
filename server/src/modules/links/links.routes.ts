import { env } from "@/config/env.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { FastifyInstance } from "fastify";
import { LinkRepository } from "./links.repository.js";
import { LinksService } from "./links.service.js";
import { LinksController } from "./links.controller.js";

export async function linksRouter(server: FastifyInstance) {
    const db = drizzle(env.DATABASE_URL)
    const repository = new LinkRepository(db)
    const service = new LinksService(repository)
    const controller = new LinksController(service)

    server.post('/links', (request, reply) => controller.create(request, reply))
    server.get('/:shortUrl', (request, reply) => controller.findByShortUrl(request, reply))
    server.get('/links', (request, reply) => controller.findAll(request, reply))
    server.delete('/links/:id', (request, reply) => controller.delete(request, reply))

}