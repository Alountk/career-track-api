import type {
  LoginCredentials,
  UserSession,
} from '@core/domain/entities/auth.entity';
import type { IAuthRepository } from '@core/domain/repositories/auth.repository';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<UserSession> {
    try {
      return await this.authRepository.login(credentials);
    } catch (error) {
      throw new Error('Invalid credentials or API failure');
    }
  }
}
