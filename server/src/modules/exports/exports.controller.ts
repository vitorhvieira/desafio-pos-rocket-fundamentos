import { FastifyReply, FastifyRequest } from "fastify";
import { ExportsService } from "./exports.service.js";

export class ExportsController {
  constructor(private service: ExportsService) {}

  async exportLinks(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const response = await this.service.exportLinks();

    return reply.status(200).send({ url: response });
  }
}
