import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable, map } from 'rxjs';
import type { ApiResponse } from '../types';
import { ClsService } from 'nestjs-cls';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor<
  unknown,
  ApiResponse<unknown>
> {
  constructor(
    private readonly cls: ClsService,
    private readonly reflector: Reflector,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ):
    | Observable<ApiResponse<unknown>>
    | Promise<Observable<ApiResponse<unknown>>> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;
    const responseMessage = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data: unknown) => ({
        data,
        message: responseMessage ?? 'Success',
        statusCode,
        requestId: this.cls.getId(),
      })),
    );
  }
}
