import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(InternalServerErrorException)
export class ServerErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message = exception.message;
    const statusCode = exception.getStatus();

    Logger.error(
      `${request.method} ${request.url} Body: ${JSON.stringify(request.body)}`,
      exception.stack,
    );

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
