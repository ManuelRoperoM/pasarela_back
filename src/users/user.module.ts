import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserOrmEntity } from './infrastructure/persistence/entities/user.typeorm-entity';
import { UserTypeOrmRepository } from './infrastructure/persistence/repositories/user.typeorm-repository';
import { UserRepository } from './domain/repositoires/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    UserTypeOrmRepository,
    {
      provide: UserRepository,
      useExisting: UserTypeOrmRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
