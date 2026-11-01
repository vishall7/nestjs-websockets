import {
  Body,
  Controller,
  Param,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards';
import {
  inviteUserSchema,
  type InviteUserDto,
} from './dtos/invitation.request.dto';
import { invitationResponseSchema } from './dtos/invitation.response.dto';
import { ParticipationService } from './participation.service';

@Controller('sessions/:sessionId/invitations')
@UseGuards(RolesGuard)
@Roles('admin')
export class InvitationsController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  @SerializeOptions({ schema: invitationResponseSchema })
  @ResponseMessage('User invited successfully')
  inviteUser(
    @CurrentUser('id') hostId: string,
    @Param('sessionId') sessionId: string,
    @Body({ schema: inviteUserSchema }) inviteUserDto: InviteUserDto,
  ) {
    return this.participationService.inviteUser(
      hostId,
      sessionId,
      inviteUserDto.email,
    );
  }
}
