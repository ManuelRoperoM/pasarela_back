import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionOrmEntity } from './infrastructure/persitence/entities/transaction.orm-entity';
import { TransactionTypeOrmRepository } from './infrastructure/persitence/repositories/transaction.typeorm-repository';
import { TransactionRepository } from './domain/repositories/transaction.reporitory';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionOrmEntity])],
  providers: [
    TransactionTypeOrmRepository,
    {
      provide: TransactionRepository,
      useExisting: TransactionTypeOrmRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionsModule {}
