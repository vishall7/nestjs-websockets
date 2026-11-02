import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { invitationsResponseSchema } from './dtos/invitation.response.dto';
import { ParticipationService } from './participation.service';

@Controller('invitations')
export class UserInvitationsController {
  constructor(private readonly participationService: ParticipationService) {}

  @Get()
  @SerializeOptions({ schema: invitationsResponseSchema })
  @ResponseMessage('Invitations retrieved successfully')
  findOwn(@CurrentUser('id') userId: string) {
    return this.participationService.findUserInvitations(userId);
  }
}
