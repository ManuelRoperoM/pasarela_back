import { TransactionStatus } from '../enums/transaction-status.enum';

export class Transaction {
  constructor(
    public readonly id: number,
    public readonly reference: string,
    public readonly userId: number,
    public readonly productId: number,
    public readonly quantity: number,
    public readonly productAmount: number,
    public readonly baseFee: number,
    public readonly deliveryFee: number,
    public readonly totalAmount: number,
    public readonly currency: string,
    public status: TransactionStatus,
    public wompiTransactionId: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
