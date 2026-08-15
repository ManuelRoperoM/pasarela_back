import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { UpdateProductStockUseCase } from '../../application/use-cases/update-product-stock.use-case';
import { UpdateProductStockDto } from '../../application/dto/update-product-stock.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly updateProductStockUseCase: UpdateProductStockUseCase,
  ) {}

  @Patch(':id/stock')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductStockDto,
  ) {
    return this.updateProductStockUseCase.execute(id, dto.stock);
  }
}
