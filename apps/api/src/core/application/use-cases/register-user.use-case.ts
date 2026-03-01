import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../ports/user.repository';
import { USER_REPOSITORY } from '../ports/user.repository';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';

export interface RegisterUserCommand {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: RegisterUserCommand): Promise<{
    id: string;
    email: string;
    role: string;
    accessToken: string;
  }> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(data.email);
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
      new Date(),
    );

    await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
