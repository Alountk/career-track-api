import { UserSession } from '@core/domain/entities/auth.entity';

export function createUserSessionMock(
  overrides: Partial<UserSession> = {},
): UserSession {
  return {
    id: crypto.randomUUID(),
    email: 'test@example.com',
    role: 'user',
    accessToken: 'mock-jwt-token',
    ...overrides,
  };
}
