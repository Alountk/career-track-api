import type { IAuthRepository } from '@core/domain/repositories/auth.repository';
import { createUserSessionMock } from '@test/factories/auth.factory';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepository: IAuthRepository;
  const mockSession = createUserSessionMock();

  beforeEach(() => {
    mockRepository = {
      login: vi.fn().mockResolvedValue(mockSession),
      register: vi.fn(),
      logout: vi.fn(),
    };
    useCase = new LoginUseCase(mockRepository);
  });

  it('should login successfully and return a session', async () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const result = await useCase.execute(credentials);

    expect(mockRepository.login).toHaveBeenCalledWith(credentials);
    expect(result).toEqual(mockSession);
  });

  it('should throw an error if login fails', async () => {
    vi.mocked(mockRepository.login).mockRejectedValueOnce(
      new Error('Auth failed'),
    );
    const credentials = { email: 'test@example.com', password: 'wrong' };

    await expect(useCase.execute(credentials)).rejects.toThrow(
      'Invalid credentials or API failure',
    );
  });
});
