import { Transaction } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';

export class TransactionMapper {
  static toDomain(entity: TransactionOrmEntity): Transaction {
    return new Transaction(
      entity.id,
      entity.reference,
      entity.userId,
      entity.productId,
      entity.quantity,
      Number(entity.productAmount),
      Number(entity.baseFee),
      Number(entity.deliveryFee),
      Number(entity.totalAmount),
      entity.currency,
      entity.status,
      entity.wompiTransactionId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toOrm(transaction: Transaction): TransactionOrmEntity {
    const entity = new TransactionOrmEntity();

    entity.id = transaction.id;
    entity.reference = transaction.reference;
    entity.userId = transaction.userId;
    entity.productId = transaction.productId;
    entity.quantity = transaction.quantity;
    entity.productAmount = transaction.productAmount;
    entity.baseFee = transaction.baseFee;
    entity.deliveryFee = transaction.deliveryFee;
    entity.totalAmount = transaction.totalAmount;
    entity.currency = transaction.currency;
    entity.status = transaction.status;
    entity.wompiTransactionId = transaction.wompiTransactionId;
    entity.createdAt = transaction.createdAt;
    entity.updatedAt = transaction.updatedAt;

    return entity;
  }
}
