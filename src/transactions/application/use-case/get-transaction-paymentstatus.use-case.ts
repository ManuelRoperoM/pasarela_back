import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.reporitory';
import { PaymentGateway } from '../../domain/repositories/payment-gateway.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/enums/transaction-status.enum';
import { FinalizeTransactionUseCase } from './finalize-transaction.use-case';

@Injectable()
export class GetTransactionPaymentStatusUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly finalizeTransactionUseCase: FinalizeTransactionUseCase,
  ) {}

  async execute(transactionId: number): Promise<Transaction> {
    const transaction =
      await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new NotFoundException(`Transaction ${transactionId} not found`);
    }

    if (!transaction.wompiTransactionId) {
      throw new BadRequestException('Transaction has no Wompi transaction ID');
    }

    if (transaction.status !== TransactionStatus.PENDING) {
      return transaction;
    }

    const paymentResult = await this.paymentGateway.getPaymentStatus(
      transaction.wompiTransactionId,
    );

    transaction.status = paymentResult.status;
    transaction.updatedAt = new Date();

    await this.transactionRepository.update(transaction);

    if (paymentResult.status === TransactionStatus.APPROVED) {
      return this.finalizeTransactionUseCase.execute(transaction.id);
    }

    return transaction;
  }
}
