import fastifyCors from '@fastify/cors'
import { drizzle } from 'drizzle-orm/node-postgres'
import { fastify } from 'fastify'
import { env } from './config/env.js'
import { linksRouter } from './modules/links/links.routes.js'

const server = fastify()


server.register(fastifyCors, { origin: '*' })
server.register(linksRouter)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
    console.log("Server is running!")
})

