import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  constructor(private readonly cls: ClsService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = performance.now();
    const requestId =
      this.cls.getId() ?? request.header('x-request-id') ?? 'unknown';
    let completed = false;

    const logResponse = (event: 'completed' | 'aborted') => {
      if (completed) {
        return;
      }

      completed = true;
      const durationMs = (performance.now() - startedAt).toFixed(2);
      const status =
        event === 'aborted'
          ? 'ABORTED'
          : `${response.statusCode} ${response.statusMessage ?? ''}`.trim();

      this.logger.log(
        `${request.method} ${request.originalUrl} -> ${status} | ${durationMs} ms | requestId: ${requestId}`,
      );
    };

    response.once('finish', () => logResponse('completed'));
    response.once('close', () => logResponse('aborted'));
    next();
  }
}
