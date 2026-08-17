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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(
    private readonly updateProductStockUseCase: UpdateProductStockUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @ApiOperation({
    summary: 'Actualizar stock de un producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Stock actualizado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @Patch(':id/stock')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductStockDto,
  ) {
    return this.updateProductStockUseCase.execute(id, dto.stock);
  }

  @ApiOperation({
    summary: 'Obtener todos los productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos disponibles',
  })
  @Get()
  async getProducts() {
    return this.getAllProductsUseCase.execute();
  }

  @ApiOperation({
    summary: 'Obtener un producto por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto por id',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.getProductUseCase.execute(id);
  }
}
