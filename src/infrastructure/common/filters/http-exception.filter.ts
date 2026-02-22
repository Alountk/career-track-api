import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from 'src/core/domain/exceptions/domain.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // STATUS CODE SELECTOR
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof DomainException
          ? exception.status
          : HttpStatus.INTERNAL_SERVER_ERROR;

    // OBTAIN MESSAGE ERROR
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    // FINAL RESPONSE
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorCode:
        exception instanceof DomainException
          ? exception.errorCode
          : 'INTERNAL_ERROR',
      // Expand the message error
      ...(typeof message === 'object' ? message : { message }),
    });
  }
}
