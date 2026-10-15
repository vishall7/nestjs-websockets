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
import {
  createSessionSchema,
  type CreateSessionDto,
  updateSessionSchema,
  type UpdateSessionDto,
} from './dtos/session.request.dto';
import { sessionResponseSchema } from './dtos/session.response.dto';
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
    @CurrentUser('id') userId: string,
    @Body({ schema: createSessionSchema }) createSessionDto: CreateSessionDto,
  ) {
    return this.sessionManagementService.create(userId, createSessionDto);
  }

  @Get()
  @SerializeOptions({ schema: sessionResponseSchema })
  @ResponseMessage('Sessions retrieved successfully')
  findAll(@CurrentUser('id') userId: string) {
    return this.sessionManagementService.findAll(userId);
  }

  @Get(':id')
  @ResponseMessage('Session retrieved successfully')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.sessionManagementService.findOne(userId, id);
  }

  @Patch(':id')
  @ResponseMessage('Session updated successfully')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body({ schema: updateSessionSchema }) updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionManagementService.update(userId, id, updateSessionDto);
  }

  @Delete(':id')
  @ResponseMessage('Session deleted successfully')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.sessionManagementService.remove(userId, id);
  }
}
