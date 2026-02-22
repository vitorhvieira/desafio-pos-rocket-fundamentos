import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'


export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message)
  }
}


export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}


export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}


export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409)
  }
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {

  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Erro de validacao',
      issues: error.issues,
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }

  console.error(error)
  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Erro interno do servidor',
  })
}
