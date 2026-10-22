import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { POSTGRES_ERROR_HTTP_MAP } from '../../database/postgres-error.constants';
import { DrizzleQueryError } from 'drizzle-orm';
import { ClsService } from 'nestjs-cls';

type HttpExceptionResponse = {
  message?: string | string[];
  details?: unknown;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly cls: ClsService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { statusCode, message, details } = this.normalizeException(exception);

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        exception instanceof Error ? exception.stack : exception,
      );
    }

    response.status(statusCode).json({
      statusCode,
      message,
      ...(details !== undefined ? { details } : {}),
      requestId: this.cls.getId(),
    });
  }

  private normalizeException(exception: unknown): {
    statusCode: number;
    message: string;
    details?: unknown;
  } {
    if (exception instanceof DrizzleQueryError) {
      return this.normalizeDrizzleException(exception);
    }

    if (!(exception instanceof HttpException)) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }

    const statusCode = exception.getStatus();
    const res = exception.getResponse();

    if (typeof res === 'string') {
      return { statusCode, message: res };
    }

    if (typeof res === 'object' && res !== null) {
      const { message, details } = res as HttpExceptionResponse;
      const text = Array.isArray(message) ? message.join(', ') : message;

      return {
        statusCode,
        message: text ?? exception.message,
        details,
      };
    }

    return { statusCode, message: exception.message };
  }

  private normalizeDrizzleException(exception: DrizzleQueryError): {
    statusCode: number;
    message: string;
    details?: unknown;
  } {
    const cause = exception.cause;
    const code =
      typeof cause === 'object' &&
      cause !== null &&
      'code' in cause &&
      typeof cause.code === 'string'
        ? cause.code
        : undefined;

    if (!code) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Database request failed',
      };
    }

    const mapped = POSTGRES_ERROR_HTTP_MAP[code];
    const constraint =
      typeof cause === 'object' &&
      cause !== null &&
      'constraint' in cause &&
      typeof cause.constraint === 'string'
        ? cause.constraint
        : undefined;

    return {
      statusCode: mapped?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      message: mapped?.message ?? 'Internal server error',
      details: {
        code,
        ...(constraint ? { constraint } : {}),
      },
    };
  }
}
