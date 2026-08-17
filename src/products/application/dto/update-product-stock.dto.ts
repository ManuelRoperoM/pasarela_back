import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateProductStockDto {
  @ApiProperty({
    example: 15,
    description: 'Nueva cantidad de unidades disponibles',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  stock: number;
}
