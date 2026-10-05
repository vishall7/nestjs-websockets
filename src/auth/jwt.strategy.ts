import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { AuthenticatedUser } from '../common/types';
import { jwtPayloadSchema } from './jwt-payload.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('auth.jwtSecret'),
    });
  }

  validate(payload: unknown): AuthenticatedUser {
    const result = jwtPayloadSchema.safeParse(payload);

    if (!result.success) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const validPayload = result.data;

    return {
      id: validPayload.sub,
      email: validPayload.email,
      role: validPayload.role,
    };
  }
}
