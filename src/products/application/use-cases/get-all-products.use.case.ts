import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from 'src/products/domain/repositories/product.repository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepostory: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepostory.findAll();
  }
}
