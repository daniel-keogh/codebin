import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class RawExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(`${request.method} ${request.url}`, exception.stack);
    }

    // Return raw error message
    response.status(status).send(`${status}: ${exception.message}`);
  }
}
