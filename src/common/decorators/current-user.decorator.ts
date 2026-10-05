import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import type { AuthenticatedUser } from '../types';

const getCurrentUser = (
  data: unknown,
  ctx: ExecutionContext,
): AuthenticatedUser => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (!request.user) {
    throw new UnauthorizedException('Authenticated user is missing');
  }

  return request.user as AuthenticatedUser;
};

export const CurrentUser = createParamDecorator(getCurrentUser);
