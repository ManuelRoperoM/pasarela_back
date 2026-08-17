import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';
import { PaymentGateway } from '../../domain/repositories/payment-gateway.repository';
import { TransactionStatus } from '../../domain/enums/transaction-status.enum';

import { ProcessPaymentDto } from '../dto/process-payment.dto';
import { UserRepository } from 'src/users/domain/repositoires/user.repository';

@Injectable()
export class ProcessTransactionPaymentUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(transactionId: number, dto: ProcessPaymentDto) {
    const transaction =
      await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new BadRequestException('Transaction has already been processed');
    }

    const user = await this.userRepository.findById(transaction.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const paymentResult = await this.paymentGateway.processPayment({
      reference: transaction.reference,
      amountInCents: Math.round(transaction.totalAmount * 100),
      currency: transaction.currency,
      customerEmail: user.email,
      installments: dto.installments,

      card: {
        number: dto.cardNumber,
        expMonth: dto.expMonth,
        expYear: dto.expYear,
        cvc: dto.cvc,
        cardHolder: dto.cardHolder,
      },
    });

    transaction.status = paymentResult.status;
    transaction.wompiTransactionId = paymentResult.transactionId;

    transaction.updatedAt = new Date();

    return this.transactionRepository.update(transaction);
  }
}
