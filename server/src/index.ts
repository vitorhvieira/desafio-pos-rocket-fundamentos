import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import { env } from './config/env.js'
import { errorHandler } from './errors/error.js'
import { exportsRouter } from './modules/exports/exports.router.js'
import { linksRouter } from './modules/links/links.routes.js'

const server = fastify()

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})
server.setErrorHandler(errorHandler)
server.register(linksRouter)
server.register(exportsRouter)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('Server is running!')
})
