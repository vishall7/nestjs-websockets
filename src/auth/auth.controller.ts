import { Body, Controller, Post } from '@nestjs/common';
import { signupSchema, type SignupDto } from './dtos/auth.request.dto';
import { loginSchema, type LoginDto } from './dtos/auth.request.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body({ schema: loginSchema }) loginDto: LoginDto) {}

  @Post('signup')
  async signup(@Body({ schema: signupSchema }) signupDto: SignupDto) {}
}
