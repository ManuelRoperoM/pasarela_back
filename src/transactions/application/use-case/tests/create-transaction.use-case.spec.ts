import { BadRequestException, NotFoundException } from '@nestjs/common';

import { CreateTransactionUseCase } from '../create-transaction.use-case';

import { UserRepository } from 'src/users/domain/repositoires/user.repository';
import { ProductRepository } from '../../../../products/domain/repositories/product.repository';
import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.reporitory';
import { DeliveryRepository } from 'src/deliveries/domain/repositories/delivery.repository';

import { TransactionPricingService } from '../../services/transaction-pricing.service';
import { TransactionReferenceService } from '../../services/transaction-reference.service';

import { User } from 'src/users/domain/entities/user.entity';
import { Product } from 'src/products/domain/entities/product.entity';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;

  let userRepository: jest.Mocked<UserRepository>;
  let productRepository: jest.Mocked<ProductRepository>;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let deliveryRepository: jest.Mocked<DeliveryRepository>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };

    productRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };

    transactionRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByReference: jest.fn(),
      update: jest.fn(),
    };

    deliveryRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByTransactionId: jest.fn(),
    };

    const pricingService = new TransactionPricingService();
    const referenceService = new TransactionReferenceService();

    useCase = new CreateTransactionUseCase(
      productRepository,
      userRepository,
      transactionRepository,
      pricingService,
      referenceService,
      deliveryRepository,
    );
  });

  it('should create a transaction successfully', async () => {
    const user = new User(
      1,
      'Manuel',
      'manuel@test.com',
      '3001234567',
      new Date(),
      new Date(),
    );

    const product = new Product(
      1,
      'Camiseta básica',
      'Camiseta de algodón',
      50000,
      10,
      null,
      new Date(),
      new Date(),
    );

    const transaction = {
      id: 1,
      reference: 'TRX-TEST',
      status: 'PENDING',
      totalAmount: 56000,
    };

    userRepository.findById.mockResolvedValue(user);
    productRepository.findById.mockResolvedValue(product);
    transactionRepository.save.mockResolvedValue(transaction as any);

    const result = await useCase.execute({
      userId: 1,
      productId: 1,
      quantity: 1,
      delivery: {
        address: 'Calle 123',
        city: 'Bogotá',
        department: 'Cundinamarca',
        postalCode: '110111',
      },
    });

    expect(result).toBe(transaction);
    expect(transactionRepository.save).toHaveBeenCalled();
    expect(deliveryRepository.save).toHaveBeenCalled();
  });

  it('should throw when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        userId: 999,
        productId: 1,
        quantity: 1,
        delivery: {
          address: 'Calle 123',
          city: 'Bogotá',
          department: 'Cundinamarca',
          postalCode: '110111',
        },
      }),
    ).rejects.toThrow(new NotFoundException('User not found'));

    expect(productRepository.findById).not.toHaveBeenCalled();
    expect(transactionRepository.save).not.toHaveBeenCalled();
  });

  it('should throw when there is insufficient stock', async () => {
    const user = new User(
      1,
      'Manuel',
      'manuel@test.com',
      '3001234567',
      new Date(),
      new Date(),
    );

    const product = new Product(
      1,
      'Camiseta básica',
      'Camiseta',
      50000,
      2,
      null,
      new Date(),
      new Date(),
    );

    userRepository.findById.mockResolvedValue(user);
    productRepository.findById.mockResolvedValue(product);

    await expect(
      useCase.execute({
        userId: 1,
        productId: 1,
        quantity: 5,
        delivery: {
          address: 'Calle 123',
          city: 'Bogotá',
          department: 'Cundinamarca',
          postalCode: '110111',
        },
      }),
    ).rejects.toThrow(new BadRequestException('Insufficient product stock'));

    expect(transactionRepository.save).not.toHaveBeenCalled();
  });
});
