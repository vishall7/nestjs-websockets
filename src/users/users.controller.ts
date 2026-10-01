import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';

import { UsersService } from './users.service';
import { updateUserSchema, type UpdateUserDto } from './dtos/user.request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  async getProfile() {
    return this.userService.getProfile();
  }

  @Patch('me')
  async updateProfile(
    @Body({ schema: updateUserSchema })
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(updateUserDto);
  }

  @Delete('me')
  async deleteProfile() {
    return this.userService.deleteProfile();
  }
}
