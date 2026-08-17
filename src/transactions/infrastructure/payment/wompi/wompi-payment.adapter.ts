import { Injectable } from '@nestjs/common';

import {
  PaymentGateway,
  PaymentRequest,
  PaymentResult,
} from '../../../domain/repositories/payment-gateway.repository';

import { WompiClient } from './wompi.client';
import { WompiSignatureService } from './wompi-signature.service';

import { TransactionStatus } from '../../../domain/enums/transaction-status.enum';

@Injectable()
export class WompiPaymentAdapter implements PaymentGateway {
  constructor(
    private readonly wompiClient: WompiClient,
    private readonly signatureService: WompiSignatureService,
  ) {}

  async processPayment(payment: PaymentRequest): Promise<PaymentResult> {
    const cardToken = await this.wompiClient.tokenizeCard(payment.card);

    const acceptanceTokens = await this.wompiClient.getAcceptanceTokens();

    const signature = this.signatureService.generate(
      payment.reference,
      payment.amountInCents,
      payment.currency,
    );

    const transaction = await this.wompiClient.createTransaction({
      reference: payment.reference,
      amountInCents: payment.amountInCents,
      currency: payment.currency,
      customerEmail: payment.customerEmail,
      cardToken,
      installments: payment.installments,
      acceptanceToken: acceptanceTokens.acceptanceToken,
      personalDataAuth: acceptanceTokens.personalDataAuth,
      signature,
    });

    return {
      status: this.mapStatus(transaction.status),
      transactionId: transaction.id,
      statusMessage: transaction.status_message ?? undefined,
    };
  }

  async getPaymentStatus(transactionId: string): Promise<PaymentResult> {
    const response = await this.wompiClient.getTransaction(transactionId);

    return {
      status: response.data.status as TransactionStatus,
      transactionId: response.data.id,
    };
  }

  private mapStatus(status: string): TransactionStatus {
    switch (status) {
      case 'APPROVED':
        return TransactionStatus.APPROVED;

      case 'DECLINED':
        return TransactionStatus.DECLINED;

      case 'ERROR':
        return TransactionStatus.ERROR;

      case 'PENDING':
      case 'VOIDED':
        return TransactionStatus.PENDING;

      default:
        return TransactionStatus.ERROR;
    }
  }
}
