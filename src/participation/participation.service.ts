import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { sessionMembers } from '../database/schema';
import { SessionManagementService } from '../session-management/session-management.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ParticipationService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
    private readonly usersService: UsersService,
    private readonly sessionManagementService: SessionManagementService,
  ) {}

  async findUserInvitations(userId: string) {
    return this.db.query.sessionMembers.findMany({
      where: { userId: { eq: userId } },
      with: { session: true },
    });
  }

  async inviteUser(hostId: string, sessionId: string, email: string) {
    const session = await this.sessionManagementService.findOne(
      hostId,
      sessionId,
    );

    if (session.status !== 'draft') {
      throw new BadRequestException(
        'Users can only be invited to draft sessions',
      );
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingMembership = await this.db.query.sessionMembers.findFirst({
      where: {
        sessionId: { eq: sessionId },
        userId: { eq: user.id },
      },
    });

    if (existingMembership) {
      throw new ConflictException('User is already a member of this session');
    }

    const [invitation] = await this.db
      .insert(sessionMembers)
      .values({
        sessionId,
        userId: user.id,
        status: 'invited',
      })
      .returning({
        id: sessionMembers.id,
        sessionId: sessionMembers.sessionId,
        userId: sessionMembers.userId,
        status: sessionMembers.status,
        invitedAt: sessionMembers.invitedAt,
      });

    return invitation;
  }
}
