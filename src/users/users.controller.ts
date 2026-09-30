import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { createUserSchema, type CreateUserDto } from './dtos/user.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('/')
  async createUser(
    @Body({ schema: createUserSchema }) createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/')
  async getUsers() {
    return 'hello';
  }

  @Get(':id')
  async getUser() {}

  @Patch(':id')
  async updateUser() {}

  @Delete(':id')
  async deleteUser() {}
}
