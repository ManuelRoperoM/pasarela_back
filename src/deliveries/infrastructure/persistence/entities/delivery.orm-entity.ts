import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DeliveryStatus } from '../../../domain/enums/delivery-status.enum';

import { TransactionOrmEntity } from '../../../../transactions/infrastructure/persitence/entities/transaction.orm-entity';

@Entity('deliveries')
export class DeliveryOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'transaction_id',
    unique: true,
  })
  transactionId: number;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  department: string;

  @Column({
    name: 'postal_code',
    length: 20,
  })
  postalCode: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
  })
  status: DeliveryStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => TransactionOrmEntity)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionOrmEntity;
}
