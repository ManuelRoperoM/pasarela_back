import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';
import { TransactionStatus } from 'src/transactions/domain/enums/transaction-status.enum';

import { WompiWebhookDto } from '../dto/wompi-webhook.dto';
import { FinalizeTransactionUseCase } from './finalize-transaction.use-case';

@Injectable()
export class HandleWompiWebhookUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly finalizeTransactionUseCase: FinalizeTransactionUseCase,
  ) {}

  async execute(dto: WompiWebhookDto) {
    const wompiTransaction = dto.data.transaction;

    const transaction = await this.transactionRepository.findByReference(
      wompiTransaction.reference,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    transaction.status = this.mapWompiStatus(wompiTransaction.status);

    transaction.wompiTransactionId = wompiTransaction.id;
    transaction.updatedAt = new Date();

    await this.transactionRepository.update(transaction);

    if (transaction.status === TransactionStatus.APPROVED) {
      return this.finalizeTransactionUseCase.execute(transaction.id);
    }

    return transaction;
  }

  private mapWompiStatus(status: string): TransactionStatus {
    switch (status) {
      case 'APPROVED':
        return TransactionStatus.APPROVED;

      case 'DECLINED':
        return TransactionStatus.DECLINED;

      case 'ERROR':
        return TransactionStatus.ERROR;

      case 'PENDING':
        return TransactionStatus.PENDING;

      default:
        return TransactionStatus.ERROR;
    }
  }
}
