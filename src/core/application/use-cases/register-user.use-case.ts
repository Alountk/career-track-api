import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/domain/entities/user.entity';
import type { IUserRepository } from '../ports/user.repository';
import { USER_REPOSITORY } from '../ports/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: any): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
        crypto.randomUUID(),
        data.name,
        data.lastName,
        data.email,
        hashedPassword,
        'user',
        new Date(),
        new Date()
    );

    await this.userRepository.save(user);
  }
}
