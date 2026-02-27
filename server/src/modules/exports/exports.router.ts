import { env } from "@/config/env.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { FastifyInstance } from "fastify";
import { LinkRepository } from "../links/links.repository.js";
import { R2Storage } from "@/infra/storage/r2-storage.js";
import { ExportsService } from "./exports.service.js";
import { ExportsController } from "./exports.controller.js";

export async function exportsRouter(server: FastifyInstance) {
  const db = drizzle(env.DATABASE_URL);
  const repository = new LinkRepository(db);
  const storage = new R2Storage();
  const service = new ExportsService(storage, repository);
  const controller = new ExportsController(service);

  server.get("/exports/links", (request, reply) =>
    controller.exportLinks(request, reply),
  );
}
