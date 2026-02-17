import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { USER_REPOSITORY } from '../core/application/ports/user.repository';
import { LoginUserUseCase } from '../core/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../core/application/use-cases/register-user.use-case';
import { InMemoryUserRepository } from './adapters/in-memory-user.repository';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY_SUPER_STRONG',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class AuthModule {}
