import {
  UserSessionSchema,
  type LoginCredentials,
  type UserData,
  type UserSession,
} from '@core/domain/entities/auth.entity';
import type { IAuthRepository } from '@core/domain/repositories/auth.repository';

export class FetchAuthRepository implements IAuthRepository {
  private readonly baseUrl = 'http://localhost:3000/auth'; // For the momento use that but after move into .env
  private readonly headers = {
    'Content-Type': 'application/json',
  };

  async login(credentials: LoginCredentials): Promise<UserSession> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    const session =  UserSessionSchema.parse(data);

      document.cookie = `auth_token=${session.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      return session;
  }
  
  async register(userData: UserData): Promise<UserSession> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Register failed');
    }
    const data = await response.json();
    return UserSessionSchema.parse(data);
  }
  
  logout(): void {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
