import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserOrmEntity } from './infrastructure/persistence/entities/user.typeorm-entity';
import { UserTypeOrmRepository } from './infrastructure/persistence/repositories/user.typeorm-repository';
import { UserRepository } from './domain/repositoires/user.repository';
import { UsersController } from './infrastructure/controller/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use.case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-byId.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    UserTypeOrmRepository,
    {
      provide: UserRepository,
      useExisting: UserTypeOrmRepository,
    },
    CreateUserUseCase,
    GetUserByIdUseCase,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
