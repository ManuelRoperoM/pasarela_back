import { TransactionStatus } from '../enums/transaction-status.enum';

export interface PaymentRequest {
  reference: string;
  amountInCents: number;
  currency: string;
  customerEmail: string;
  installments: number;

  card: {
    number: string;
    expMonth: string;
    expYear: string;
    cvc: string;
    cardHolder: string;
  };
}

export interface PaymentResult {
  status: TransactionStatus;
  transactionId: string | null;
  statusMessage?: string;
}

export abstract class PaymentGateway {
  abstract processPayment(payment: PaymentRequest): Promise<PaymentResult>;
  abstract getPaymentStatus(transactionId: string): Promise<PaymentResult>;
}
