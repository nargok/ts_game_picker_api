import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException'

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  response
    .sendStatus(statusCode)
    .send({
      statusCode,
      message,
    })
}

export default errorMiddleware;
