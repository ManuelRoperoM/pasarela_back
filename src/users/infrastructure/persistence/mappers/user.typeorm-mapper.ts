import { User } from 'src/users/domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.typeorm-entity';

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.phone,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toOrm(user: User): UserOrmEntity {
    const entity = new UserOrmEntity();

    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.phone = user.phone;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;

    return entity;
  }
}
