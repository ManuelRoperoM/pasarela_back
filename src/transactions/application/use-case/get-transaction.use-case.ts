import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class GetTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
