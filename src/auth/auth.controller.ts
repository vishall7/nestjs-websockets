import { Body, Controller, Post, Get } from '@nestjs/common';
import { signupSchema, type SignupDto } from './dtos/auth.request.dto';
import { loginSchema, type LoginDto } from './dtos/auth.request.dto';
import { AuthService } from './auth.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { IsPublic } from '../common/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getAuthStatus() {
    return { status: 'ok' };
  }

  @Post('login')
  @IsPublic()
  @ResponseMessage('User successfully logged in')
  async login(@Body({ schema: loginSchema }) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @IsPublic()
  @ResponseMessage('User successfully registered')
  async signup(@Body({ schema: signupSchema }) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
