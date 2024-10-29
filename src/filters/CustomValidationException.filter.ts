import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'src/utils/response';

@Catch(BadRequestException)
export class CustomValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const validationErrors = exceptionResponse.message || [];
    response
      .status(status)
      .json(ErrorResponse('Validation Failed', validationErrors));
  }
}
