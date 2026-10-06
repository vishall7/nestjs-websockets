import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import type { AuthenticatedUser } from '../common/types';
import {
  createSessionSchema,
  type CreateSessionDto,
  updateSessionSchema,
  type UpdateSessionDto,
} from './dtos/session.request.dto';
import {
  sessionListResponseSchema,
  sessionResponseSchema,
} from './dtos/session.response.dto';
import { SessionManagementService } from './session-management.service';

@Controller('sessions')
@UseGuards(RolesGuard)
@Roles('admin')
@SerializeOptions({ schema: sessionResponseSchema })
export class SessionManagementController {
  constructor(
    private readonly sessionManagementService: SessionManagementService,
  ) {}

  @Post()
  @ResponseMessage('Session created successfully')
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body({ schema: createSessionSchema }) createSessionDto: CreateSessionDto,
  ) {
    return this.sessionManagementService.create(user, createSessionDto);
  }

  @Get()
  @SerializeOptions({ schema: sessionListResponseSchema })
  @ResponseMessage('Sessions retrieved successfully')
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.sessionManagementService.findAll(user);
  }

  @Get(':id')
  @ResponseMessage('Session retrieved successfully')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.sessionManagementService.findOne(user, id);
  }

  @Patch(':id')
  @ResponseMessage('Session updated successfully')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body({ schema: updateSessionSchema }) updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionManagementService.update(user, id, updateSessionDto);
  }

  @Delete(':id')
  @ResponseMessage('Session deleted successfully')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.sessionManagementService.remove(user, id);
  }
}
