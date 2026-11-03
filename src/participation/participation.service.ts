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
import type { MemberStatus } from '../database/schema/sessionMembers';
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

  async findUserInvitations(userId: string, status?: MemberStatus) {
    const where = status
      ? { userId: { eq: userId }, status: { eq: status } }
      : { userId: { eq: userId } };

    return this.db.query.sessionMembers.findMany({
      where,
      with: { session: true },
    });
  }

  async inviteUser(hostId: string, sessionId: string, inviteeUserId: string) {
    const session = await this.sessionManagementService.findOne(
      hostId,
      sessionId,
    );

    if (session.status !== 'draft') {
      throw new BadRequestException(
        'Users can only be invited to draft sessions',
      );
    }

    if (!(await this.usersService.userExists(inviteeUserId))) {
      throw new NotFoundException('User not found');
    }

    const existingMembership = await this.db.query.sessionMembers.findFirst({
      where: {
        sessionId: { eq: sessionId },
        userId: { eq: inviteeUserId },
      },
    });

    if (existingMembership) {
      throw new ConflictException('User is already a member of this session');
    }

    const [invitation] = await this.db
      .insert(sessionMembers)
      .values({
        sessionId,
        userId: inviteeUserId,
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
