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
import { DeliveriesModule } from 'src/deliveries/delivery.module';
import { GetTransactionUseCase } from './application/use-cases/get-transaction.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionOrmEntity]),
    ProductsModule,
    UsersModule,
    DeliveriesModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionTypeOrmRepository,
    CreateTransactionUseCase,
    TransactionPricingService,
    TransactionReferenceService,
    GetTransactionUseCase,
    {
      provide: TransactionRepository,
      useExisting: TransactionTypeOrmRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionsModule {}
