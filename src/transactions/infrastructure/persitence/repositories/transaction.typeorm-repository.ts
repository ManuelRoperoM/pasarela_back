import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';

import { TransactionOrmEntity } from '../entities/transaction.orm-entity';
import { TransactionMapper } from '../mappers/transaction.mapper';

@Injectable()
export class TransactionTypeOrmRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionOrmEntity)
    private readonly repository: Repository<TransactionOrmEntity>,
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    const entity = TransactionMapper.toOrm(transaction);

    const savedEntity = await this.repository.save(entity);

    return TransactionMapper.toDomain(savedEntity);
  }

  async findById(id: number): Promise<Transaction | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity ? TransactionMapper.toDomain(entity) : null;
  }

  async findByReference(reference: string): Promise<Transaction | null> {
    const entity = await this.repository.findOne({
      where: { reference },
    });

    return entity ? TransactionMapper.toDomain(entity) : null;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const entity = TransactionMapper.toOrm(transaction);

    const updatedEntity = await this.repository.save(entity);

    return TransactionMapper.toDomain(updatedEntity);
  }
}
