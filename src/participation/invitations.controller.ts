import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards';
import {
  invitationQuerySchema,
  inviteUserSchema,
  type InvitationQueryDto,
  type InviteUserDto,
} from './dtos/invitation.request.dto';
import {
  invitationResponseSchema,
  invitationsResponseSchema,
} from './dtos/invitation.response.dto';
import { ParticipationService } from './participation.service';

@Controller('invitations')
@UseGuards(RolesGuard)
export class InvitationsController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  @Roles('admin')
  @SerializeOptions({ schema: invitationResponseSchema })
  @ResponseMessage('User invited successfully')
  inviteUser(
    @CurrentUser('id') hostId: string,
    @Body({ schema: inviteUserSchema }) inviteUserDto: InviteUserDto,
  ) {
    return this.participationService.inviteUser(
      hostId,
      inviteUserDto.sessionId,
      inviteUserDto.inviteeUserId,
    );
  }

  @Get()
  @SerializeOptions({ schema: invitationsResponseSchema })
  @ResponseMessage('Invitations retrieved successfully')
  findOwn(
    @CurrentUser('id') userId: string,
    @Query({ schema: invitationQuerySchema }) query: InvitationQueryDto,
  ) {
    return this.participationService.findUserInvitations(userId, query.status);
  }
}
