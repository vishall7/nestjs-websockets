import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import type { UpdateUserDto } from './dtos/user.request.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  async getProfile() {}

  async updateProfile(updateUserDto: UpdateUserDto) {}

  async deleteProfile() {}
}
