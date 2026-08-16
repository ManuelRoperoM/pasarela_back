import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositoires/user.repository';

import { UserOrmEntity } from '../entities/user.typeorm-entity';
import { UserMapper } from '../mappers/user.typeorm-mapper';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = UserMapper.toOrm(user);

    const savedEntity = await this.repository.save(entity);

    return UserMapper.toDomain(savedEntity);
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { email },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }
}
