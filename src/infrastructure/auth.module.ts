import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { USER_REPOSITORY } from '../core/application/ports/user.repository';
import { GetProfileUseCase } from '../core/application/use-cases/get-profile.use-case';
import { LoginUserUseCase } from '../core/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../core/application/use-cases/register-user.use-case';
import { InMemoryUserRepository } from './adapters/in-memory-user.repository';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    GetProfileUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [USER_REPOSITORY, JwtModule],
})
export class AuthModule {}
