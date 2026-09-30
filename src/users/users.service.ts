import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { type CreateUserDto } from './dtos/user.request.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  private users = new Map<string, unknown>();

  async createUser(createUserDto: CreateUserDto) {
    const id = randomUUID();
    this.users.set(id, createUserDto);
    console.log(this.users);
    this.logger.log('user created');
    return id;
  }

  async getUser(id: string) {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async getUsers() {
    return [...this.users];
  }

  async updateUser() {}

  async deleteUser() {}
}
