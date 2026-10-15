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
import { UsersService } from './users.service';
import { updateUserSchema, type UpdateUserDto } from './dtos/user.request.dto';
import { userResponseSchema } from './dtos/users.response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @ResponseMessage('User profile retrieved successfully')
  @SerializeOptions({ schema: userResponseSchema })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Patch('me')
  @ResponseMessage('User profile updated successfully')
  @SerializeOptions({ schema: userResponseSchema })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body({ schema: updateUserSchema })
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(userId, updateUserDto);
  }

  @Delete('me')
  @ResponseMessage('User profile deleted successfully')
  @SerializeOptions({ schema: userResponseSchema })
  async deleteProfile(@CurrentUser('id') userId: string) {
    return this.userService.deleteProfile(userId);
  }
}
