import { User } from "../../../core/domain/entities/user.entity";
import { UserOrmEntity } from "../entities/user.orm-entity";

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): User {
    return new User(
      ormEntity.id,
      ormEntity.name,
      ormEntity.lastName,
      ormEntity.email,
      ormEntity.password,
      ormEntity.role,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domainEntity: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domainEntity.id;
    orm.name = domainEntity.name;
    orm.lastName = domainEntity.lastName;
    orm.email = domainEntity.email;
    orm.password = domainEntity.password;
    orm.role = domainEntity.role;
    return orm;
  }
}