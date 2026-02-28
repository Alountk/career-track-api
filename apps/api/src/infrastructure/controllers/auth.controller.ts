import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserUseCase } from '../../core/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../../core/application/use-cases/register-user.use-case';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetProfileUseCase } from '../../core/application/use-cases/get-profile.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUserUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() body: RegisterUserDto) {
    return await this.registerUseCase.execute(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and get token' })
  async login(@Body() body: LoginUserDto) {
    return await this.loginUseCase.execute(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Request() req) {
    return await this.getProfileUseCase.execute(req.user.email);
  }
}
