import { User } from '../../core/domain/entities/user.entity';
import type { IUserRepository } from '../../core/application/ports/user.repository';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return Promise.resolve(user || null);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return Promise.resolve(user || null);
  }
}
