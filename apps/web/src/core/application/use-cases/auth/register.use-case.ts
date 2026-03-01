import type { UserData, UserSession } from '@core/domain/entities/auth.entity';
import type { IAuthRepository } from '@core/domain/repositories/auth.repository';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(userData: UserData): Promise<UserSession> {
    try {
      return await this.authRepository.register(userData);
    } catch (error) {
      throw new Error('User registration failed');
    }
  }
}
