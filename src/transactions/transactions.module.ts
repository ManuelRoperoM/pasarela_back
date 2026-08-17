import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionOrmEntity } from './infrastructure/persitence/entities/transaction.orm-entity';
import { TransactionTypeOrmRepository } from './infrastructure/persitence/repositories/transaction.typeorm-repository';
import { TransactionRepository } from './domain/repositories/transaction.reporitory';
import { CreateTransactionUseCase } from './application/use-case/create-transaction.use-case';
import { TransactionPricingService } from './application/services/transaction-pricing.service';
import { TransactionReferenceService } from './application/services/transaction-reference.service';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/user.module';
import { TransactionsController } from './infrastructure/controllers/transaction.controller';
import { DeliveriesModule } from 'src/deliveries/delivery.module';
import { GetTransactionUseCase } from './application/use-case/get-transaction.use-case';
import { ProcessTransactionPaymentUseCase } from './application/use-case/process-transaction-payment.use-case';
import { GetTransactionPaymentStatusUseCase } from './application/use-case/get-transaction-paymentstatus.use-case';
import { FinalizeTransactionUseCase } from './application/use-case/finalize-transaction.use-case';
import { HandleWompiWebhookUseCase } from './application/use-case/handle-wompi-webhook.use-case';
import { WompiClient } from './infrastructure/payment/wompi/wompi.client';
import { WompiPaymentAdapter } from './infrastructure/payment/wompi/wompi-payment.adapter';
import { PaymentGateway } from './domain/repositories/payment-gateway.repository';
import { WompiSignatureService } from './infrastructure/payment/wompi/wompi-signature.service';

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
    ProcessTransactionPaymentUseCase,
    GetTransactionPaymentStatusUseCase,
    FinalizeTransactionUseCase,
    HandleWompiWebhookUseCase,
    ProcessTransactionPaymentUseCase,
    WompiClient,
    WompiPaymentAdapter,
    WompiSignatureService,
    {
      provide: TransactionRepository,
      useExisting: TransactionTypeOrmRepository,
    },
    {
      provide: PaymentGateway,
      useExisting: WompiPaymentAdapter,
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionsModule {}
