import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UpdateUserDto } from './dtos/user.request.dto';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  async findByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: { email: { eq: email } },
    });
  }

  async createUser(input: CreateUserInput) {
    const [user] = await this.db.insert(users).values(input).returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      role: users.role,
    });

    return user;
  }

  async getProfile(id: string) {
    const user = await this.db.query.users.findFirst({
      where: { id: { eq: id } },
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    const [user] = await this.db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
      });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteProfile(id: string) {
    const [user] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
      });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
