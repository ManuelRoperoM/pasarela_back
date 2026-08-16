import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionOrmEntity } from './infrastructure/persitence/entities/transaction.orm-entity';
import { TransactionTypeOrmRepository } from './infrastructure/persitence/repositories/transaction.typeorm-repository';
import { TransactionRepository } from './domain/repositories/transaction.reporitory';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { TransactionPricingService } from './application/services/transaction-pricing.service';
import { TransactionReferenceService } from './application/services/transaction-reference.service';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/user.module';
import { TransactionsController } from './infrastructure/controllers/transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionOrmEntity]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionTypeOrmRepository,
    CreateTransactionUseCase,
    TransactionPricingService,
    TransactionReferenceService,
    {
      provide: TransactionRepository,
      useExisting: TransactionTypeOrmRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionsModule {}
