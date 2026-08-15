import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class UpdateProductStockUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number, stock: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    product.updateStock(stock);

    return this.productRepository.update(product);
  }
}
