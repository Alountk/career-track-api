import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../../core/domain/entities/user.entity';
import type { IUserRepository } from '../ports/user.repository';
import { LoginUserUseCase } from './login-user.use-case';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
    } as any;

    jwtService = {
      signAsync: jest.fn(),
    } as any;

    useCase = new LoginUserUseCase(userRepository, jwtService);
  });

  it('should return access token when credentias are valid', async () => {
    // GIVEN (PREPARATION)
    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user for test (Mock)
    const mockUser = new User(
      'user-id',
      'John',
      'Doe',
      'test@example.com',
      hashedPassword,
      'user',
      new Date(),
      new Date(),
    );

    // Configure the mocks for return expected values
    userRepository.findByEmail.mockResolvedValue(mockUser);
    jwtService.signAsync.mockResolvedValue('mock-jwt-token');

    // WHEN (ACTION)
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'Password123!',
    });

    // THEN (RESULT)
    expect(result).toEqual({
      accessToken: 'mock-jwt-token',
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should throw UnauthorizedException when password is incorrect', async () => {
    // GIVEN
    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const mockUser = new User(
      'user-id',
      'John',
      'Doe',
      'test@example.com',
      hashedPassword,
      'user',
      new Date(),
      new Date(),
    );
    userRepository.findByEmail.mockResolvedValue(mockUser);
    
    // WHEN & THEN
    await expect(
        useCase.execute({
            email: 'test@example.com',
            password: 'WrongPassword',
        }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('', () => {});
});
