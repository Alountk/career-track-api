import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../core/application/ports/user.repository';
import { User } from '../../core/domain/entities/user.entity';
import { UserOrmEntity } from '../persistence/entities/user.orm-entity';
import { UserMapper } from '../persistence/mappers/user.mapper';

export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const ormUser = UserMapper.toOrm(user);
    await this.repository.save(ormUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.repository.findOneBy({ email });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.repository.findOneBy({ id });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }
}
