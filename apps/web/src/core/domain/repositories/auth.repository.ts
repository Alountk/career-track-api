import type { LoginCredentials, UserData, UserSession } from "../entities/auth.entity";

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<UserSession>;
  register(userData: UserData): Promise<UserSession>;
  logout(): void;
}