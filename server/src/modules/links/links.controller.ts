import { FastifyReply, FastifyRequest } from "fastify";
import { LinksService } from "./links.service.js";
import z from "zod";

const createLinkBody = z.object({
    originalUrl: z.string().url(),
    shortUrl: z.string().min(4).max(20),
})

const findByShortUrlParams = z.object({
    shortUrl: z.string()
})

const idParams = z.object({
    id: z.string()
})



export class LinksController {
    constructor(private linksService: LinksService) { }

    async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const { originalUrl, shortUrl } = createLinkBody.parse(request.body)

        const link = await this.linksService.createLink({ originalUrl, shortUrl, })

        return reply.status(201).send(link)
    }

    async findByShortUrl(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const { shortUrl } = findByShortUrlParams.parse(request.params)

        const link = await this.linksService.findByShortUrl(shortUrl)

        await this.linksService.incrementAccessCount(link!.id)

        return reply.redirect(link!.originalUrl)
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const link = await this.linksService.findAll()

        return reply.status(200).send(link)
    }

    async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const { id } = idParams.parse(request.params)

        await this.linksService.deleteById(id)

        return reply.status(204).send()
    }
}