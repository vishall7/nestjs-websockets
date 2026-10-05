import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  SerializeOptions,
} from '@nestjs/common';
import { ResponseMessage } from '../common/decorators/response-message.decorator';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../common/types';
import { UsersService } from './users.service';
import { updateUserSchema, type UpdateUserDto } from './dtos/user.request.dto';
import { userResponseSchema } from './dtos/users.response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @ResponseMessage('User profile retrieved successfully')
  @SerializeOptions({ schema: userResponseSchema })
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.userService.getProfile(user.id);
  }

  @Patch('me')
  @ResponseMessage('User profile updated successfully')
  @SerializeOptions({ schema: userResponseSchema })
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body({ schema: updateUserSchema })
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(user.id, updateUserDto);
  }

  @Delete('me')
  @ResponseMessage('User profile deleted successfully')
  @SerializeOptions({ schema: userResponseSchema })
  async deleteProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.userService.deleteProfile(user.id);
  }
}
