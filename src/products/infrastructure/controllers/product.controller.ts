import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { UpdateProductStockUseCase } from '../../application/use-cases/update-product-stock.use-case';
import { UpdateProductStockDto } from '../../application/dto/update-product-stock.dto';
import { GetProductUseCase } from 'src/products/application/use-cases/get-product.use-case';
import { GetAllProductsUseCase } from 'src/products/application/use-cases/get-all-products.use.case';

@Controller('products')
export class ProductController {
  constructor(
    private readonly updateProductStockUseCase: UpdateProductStockUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Patch(':id/stock')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductStockDto,
  ) {
    return this.updateProductStockUseCase.execute(id, dto.stock);
  }

  @Get()
  async getProducts() {
    return this.getAllProductsUseCase.execute();
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.getProductUseCase.execute(id);
  }
}
