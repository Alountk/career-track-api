import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../ports/user.repository';
import { GetProfileUseCase } from './get-profile.use-case';
import { NotFoundException } from '@nestjs/common';

describe('GetProfileUseCase', () => {
  let useCase: GetProfileUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as any;
    useCase = new GetProfileUseCase(userRepository);
  });

  it('should return user profile when user exists', async () => {
    // GIVEN
    const email = 'john@example.com';
    const mockUser = new User(
      'user-123',
      'John',
      'Doe',
      email,
      'hashedPassword',
      'user',
      new Date(),
      new Date(),
    );

    userRepository.findByEmail.mockResolvedValue(mockUser);

    //  WHEN
    const result = await useCase.execute(email);

    // THEN
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual({
      id: 'user-123',
      name: 'John',
      lastName: 'Doe',
      email: email,
      role: 'user',
    });
    // Verify security: The password no should be in result
    expect((result as any).password).toBeUndefined();
  });

  it('should throw NotFoundException when user does not exist', async () => {
    // GIVEN
    userRepository.findByEmail.mockResolvedValue(null);

    // WHEN & THEN
    await expect(useCase.execute('unknow@mail.com')).rejects.toThrow(
      NotFoundException,
    );
  });
});
