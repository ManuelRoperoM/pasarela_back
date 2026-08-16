import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductOrmEntity } from './infrastructure/persistence/entities/product.orm-entity';
import { ProductTypeOrmRepository } from './infrastructure/persistence/repositories/product.typeorm-repository';
import { ProductRepository } from './domain/repositories/product.repository';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';
import { UpdateProductStockUseCase } from './application/use-cases/update-product-stock.use-case';
import { ProductController } from './infrastructure/controllers/product.controller';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products.use.case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [
    GetProductUseCase,
    UpdateProductStockUseCase,
    GetAllProductsUseCase,
    ProductTypeOrmRepository,
    {
      provide: ProductRepository,
      useExisting: ProductTypeOrmRepository,
    },
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
