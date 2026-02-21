import fastifyCors from '@fastify/cors'
import { drizzle } from 'drizzle-orm/node-postgres'
import { fastify } from 'fastify'
import { env } from './config/env.js'

const server = fastify()
const db = drizzle(env.DATABASE_URL)


server.register(fastifyCors, { origin: '*' })

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
    console.log("Server is running!")
})

