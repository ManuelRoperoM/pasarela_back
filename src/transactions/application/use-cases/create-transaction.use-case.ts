import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { ProductRepository } from 'src/products/domain/repositories/product.repository';
import { UserRepository } from 'src/users/domain/repositoires/user.repository';
import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';

import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/enums/transaction-status.enum';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionPricingService } from '../services/transaction-pricing.service';
import { TransactionReferenceService } from '../services/transaction-reference.service';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly pricingService: TransactionPricingService,
    private readonly referenceService: TransactionReferenceService,
  ) {}

  async execute(dto: CreateTransactionDto): Promise<Transaction> {
    const user = await this.userRepository.findById(dto.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findById(dto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < dto.quantity) {
      throw new BadRequestException('Insufficient product stock');
    }

    const pricing = this.pricingService.calculate(product.price, dto.quantity);

    const reference = this.referenceService.generate();

    const transaction = new Transaction(
      0,
      reference,
      user.id,
      product.id,
      dto.quantity,
      pricing.productAmount,
      pricing.baseFee,
      pricing.deliveryFee,
      pricing.totalAmount,
      'COP',
      TransactionStatus.PENDING,
      null,
      new Date(),
      new Date(),
    );

    return this.transactionRepository.save(transaction);
  }
}
