import { Inject, Injectable, ConflictException } from '@nestjs/common';
import type { SignupDto } from './dtos/auth.request.dto';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import bycrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { users } from '../database/schema';

@Injectable()
export class AuthService {
  constructor(@Inject(DATABASE_CONNECTION) db: Database) {}
  async signup(signupDto: SignupDto) {
    const existingUser = await this.db.query.users.findFirst({
      where: eq(users.email, signupDto.email),
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(signupDto.password, 12);

    const [user] = await this.db
      .insert(users)
      .values({
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        email: signupDto.email,
        passwordHash,
      })
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
      });

    return user;
  }
}
