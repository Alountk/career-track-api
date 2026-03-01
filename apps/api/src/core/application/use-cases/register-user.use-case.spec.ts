import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../ports/user.repository';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    jwtService = {
      signAsync: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    useCase = new RegisterUserUseCase(userRepository, jwtService);
  });

  it('should register a user', async () => {
    // GIVEN
    const data = {
      email: 'john@example.com',
      password: 'Password123!',
      name: 'John',
      lastName: 'Doe',
      role: 'user',
    };

    // Configure the mock to return a user when findByEmail is called
    userRepository.findByEmail.mockResolvedValue(null);
    jwtService.signAsync.mockResolvedValue('mock-jwt-token');

    // WHEN
    const result = await useCase.execute(data);

    // THEN
    expect(userRepository.save).toHaveBeenCalled();
    const savedUser = userRepository.save.mock.calls[0][0];
    expect(savedUser.email).toBe(data.email);
    expect(savedUser.password).not.toBe(data.password);

    expect(result).toEqual({
      id: expect.any(String),
      email: data.email,
      role: 'user',
      accessToken: 'mock-jwt-token',
    });
  });
});
