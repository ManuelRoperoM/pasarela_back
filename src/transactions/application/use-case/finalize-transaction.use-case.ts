import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';
import { ProductRepository } from 'src/products/domain/repositories/product.repository';
import { DeliveryRepository } from 'src/deliveries/domain/repositories/delivery.repository';

import { TransactionStatus } from 'src/transactions/domain/enums/transaction-status.enum';
import { DeliveryStatus } from 'src/deliveries/domain/enums/delivery-status.enum';

@Injectable()
export class FinalizeTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly productRepository: ProductRepository,
    private readonly deliveryRepository: DeliveryRepository,
  ) {}

  async execute(transactionId: number) {
    const transaction =
      await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.status !== TransactionStatus.APPROVED) {
      throw new BadRequestException(
        'Transaction must be approved before finalizing',
      );
    }

    const delivery =
      await this.deliveryRepository.findByTransactionId(transactionId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    const product = await this.productRepository.findById(
      transaction.productId,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < transaction.quantity) {
      throw new BadRequestException('Insufficient product stock');
    }

    product.stock -= transaction.quantity;
    product.updatedAt = new Date();

    await this.productRepository.update(product);

    delivery.status = DeliveryStatus.PREPARING;
    delivery.updatedAt = new Date();

    await this.deliveryRepository.save(delivery);

    return transaction;
  }
}
