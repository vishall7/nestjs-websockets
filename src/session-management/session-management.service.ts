import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { sessions } from '../database/schema';
import { UsersService } from '../users/users.service';
import type {
  CreateSessionDto,
  UpdateSessionDto,
} from './dtos/session.request.dto';
import type { Session } from '../database/schema/sessions';

@Injectable()
export class SessionManagementService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createSessionDto: CreateSessionDto) {
    if (!(await this.usersService.userExists(userId))) {
      throw new NotFoundException('User not found');
    }

    const { durationMinutes, ...sessionData } = createSessionDto;
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);

    const [session] = await this.db
      .insert(sessions)
      .values({
        ...sessionData,
        joinCode: this.generateJoinCode(),
        status: 'draft',
        expiresAt,
        createdBy: userId,
      })
      .returning({ id: sessions.id });

    return session;
  }

  async findAll(userId: string): Promise<Session[]> {
    const sessionList = await this.db.query.sessions.findMany({
      where: { createdBy: { eq: userId } },
      orderBy: { createdAt: 'desc' },
    });

    return sessionList;
  }

  async findOne(userId: string, id: string) {
    const session = await this.db.query.sessions.findFirst({
      where: {
        id: { eq: id },
        createdBy: { eq: userId },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async update(userId: string, id: string, updateSessionDto: UpdateSessionDto) {
    if (!(await this.usersService.userExists(userId))) {
      throw new NotFoundException('User not found');
    }

    const [session] = await this.db
      .update(sessions)
      .set(updateSessionDto)
      .where(and(eq(sessions.id, id), eq(sessions.createdBy, userId)))
      .returning({ id: sessions.id });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async remove(userId: string, id: string) {
    if (!(await this.usersService.userExists(userId))) {
      throw new NotFoundException('User not found');
    }

    const [session] = await this.db
      .delete(sessions)
      .where(and(eq(sessions.id, id), eq(sessions.createdBy, userId)))
      .returning({ id: sessions.id });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  private generateJoinCode() {
    return randomBytes(4).toString('hex').toUpperCase();
  }
}
