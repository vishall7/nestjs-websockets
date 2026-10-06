import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { sessions } from '../database/schema';
import type { AuthenticatedUser } from '../common/types';
import type {
  CreateSessionDto,
  UpdateSessionDto,
} from './dtos/session.request.dto';

@Injectable()
export class SessionManagementService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  async create(user: AuthenticatedUser, createSessionDto: CreateSessionDto) {
    const [session] = await this.db
      .insert(sessions)
      .values({
        ...createSessionDto,
        joinCode: this.generateJoinCode(),
        createdBy: user.id,
      })
      .returning();

    return session;
  }

  async findAll(user: AuthenticatedUser) {
    return this.db.query.sessions.findMany({
      where: { createdBy: { eq: user.id } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(user: AuthenticatedUser, id: string) {
    const session = await this.db.query.sessions.findFirst({
      where: {
        id: { eq: id },
        createdBy: { eq: user.id },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async update(
    user: AuthenticatedUser,
    id: string,
    updateSessionDto: UpdateSessionDto,
  ) {
    const [session] = await this.db
      .update(sessions)
      .set(updateSessionDto)
      .where(and(eq(sessions.id, id), eq(sessions.createdBy, user.id)))
      .returning();

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async remove(user: AuthenticatedUser, id: string) {
    const [session] = await this.db
      .delete(sessions)
      .where(and(eq(sessions.id, id), eq(sessions.createdBy, user.id)))
      .returning();

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  private generateJoinCode() {
    return randomBytes(4).toString('hex').toUpperCase();
  }
}
