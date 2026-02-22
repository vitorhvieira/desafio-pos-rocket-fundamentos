import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import { env } from './config/env.js'
import { linksRouter } from './modules/links/links.routes.js'
import { errorHandler } from './errors/error.js'

const server = fastify()


server.register(fastifyCors, { origin: '*' })
server.register(linksRouter)
server.setErrorHandler(errorHandler)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
    console.log("Server is running!")
})

