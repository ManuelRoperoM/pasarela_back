import { Transaction } from '../entities/transaction.entity';

// Puerto
export abstract class TransactionRepository {
  abstract save(transaction: Transaction): Promise<Transaction>;

  abstract findById(id: number): Promise<Transaction | null>;

  abstract findByReference(reference: string): Promise<Transaction | null>;

  abstract update(transaction: Transaction): Promise<Transaction>;
}
