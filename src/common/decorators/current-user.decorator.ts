import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import type { AuthenticatedUser } from '../types';

const getCurrentUser = (
  data: keyof AuthenticatedUser | undefined,
  ctx: ExecutionContext,
): AuthenticatedUser | AuthenticatedUser[keyof AuthenticatedUser] => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (!request.user) {
    throw new UnauthorizedException('Authenticated user is missing');
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
};

export const CurrentUser = createParamDecorator(getCurrentUser);
