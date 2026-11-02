import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { SessionManagementModule } from '../session-management/session-management.module';
import { InvitationsController } from './invitations.controller';
import { UserInvitationsController } from './user-invitations.controller';
import { ParticipationService } from './participation.service';

@Module({
  imports: [DatabaseModule, UsersModule, SessionManagementModule],
  controllers: [InvitationsController, UserInvitationsController],
  providers: [ParticipationService],
  exports: [ParticipationService],
})
export class ParticipationModule {}
