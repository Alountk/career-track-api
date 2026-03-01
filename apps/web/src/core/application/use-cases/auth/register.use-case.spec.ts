import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { createUserSessionMock } from '@test/factories/auth.factory';
import type { IAuthRepository } from '@core/domain/repositories/auth.repository';
import type { UserData } from '@core/domain/entities/auth.entity';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let mockRepository: IAuthRepository;
  const mockSession = createUserSessionMock();

  beforeEach(() => {
    mockRepository = {
      register: vi.fn().mockResolvedValue(mockSession),
      login: vi.fn(),
      logout: vi.fn(),
    };
    useCase = new RegisterUseCase(mockRepository);
  });

  it('should register successfully and return a session', async () => {
    const userData: UserData = {
      name: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    };
    const result = await useCase.execute(userData);

    expect(mockRepository.register).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mockSession);
  });

  it('should throw an error if registration fails', async () => {
    vi.mocked(mockRepository.register).mockRejectedValueOnce(
      new Error('Reg failed'),
    );
    const userData: UserData = {
      name: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    };

    await expect(useCase.execute(userData)).rejects.toThrow(
      'User registration failed',
    );
  });
});
