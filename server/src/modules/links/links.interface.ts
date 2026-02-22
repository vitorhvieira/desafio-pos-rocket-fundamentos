import { Link, NewLink } from "@/db/schema.js"

export interface ILinks {
    createLink: (data: NewLink) => Promise<Link>,
    findByShortUrl: (shortUrl: string) => Promise<Link | null>,
    findById: (id: string) => Promise<Link | null>,
    findAll: () => Promise<Link[]>,
    deleteById: (id: string) => Promise<void>
    incrementAccessCount: (id: string) => Promise<void>
}