import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TransactionStatus } from 'src/transactions/domain/enums/transaction-status.enum';

@Entity('transactions')
export class TransactionOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  reference: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;

  @Column({
    name: 'product_amount',
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  productAmount: number;

  @Column({
    name: 'base_fee',
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  baseFee: number;

  @Column({
    name: 'delivery_fee',
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  deliveryFee: number;

  @Column({
    name: 'total_amount',
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  totalAmount: number;

  @Column({ length: 3 })
  currency: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
  })
  status: TransactionStatus;

  @Column({
    name: 'wompi_transaction_id',
    nullable: true,
    length: 100,
  })
  wompiTransactionId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
