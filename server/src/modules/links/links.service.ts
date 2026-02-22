import { Link, NewLink } from "@/db/schema.js";
import { ILinks } from "./links.interface.js";
import { BadRequestError, ConflictError, NotFoundError } from "@/errors/error.js";

export class LinksService {
    constructor(private repository: ILinks) { }

    async createLink(data: NewLink): Promise<Link> {
        const alreadyExistsLink = await this.repository.findByShortUrl(data.shortUrl)

        if (alreadyExistsLink) throw new ConflictError("Esta URL ja esta cadastrada!")

        return await this.repository.createLink(data)
    }

    async findByShortUrl(shortUrl: string): Promise<Link | null> {
        const link = await this.repository.findByShortUrl(shortUrl)

        if (!link) throw new NotFoundError("Essa URL não existe!")

        return link
    }

    async findById(id: string): Promise<Link | null> {
        const link = await this.repository.findById(id)

        if (!link) throw new NotFoundError("Não existe nenhuma URL com este ID!")

        return link
    }

    async findAll(): Promise<Link[]> {
        return await this.repository.findAll()
    }

    async deleteById(id: string): Promise<void> {
        const link = await this.repository.findById(id)

        if (!link) throw new NotFoundError("Não foi possivel deletar sua URL!")

        return await this.repository.deleteById(id)
    }

    async incrementAccessCount(id: string): Promise<void> {
        const link = await this.repository.findById(id)

        if (!link) throw new NotFoundError("Não foi possivel incrementar")

        return await this.repository.incrementAccessCount(id)
    }
}