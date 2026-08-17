import { Type } from 'class-transformer';
import { IsInt, IsPositive, ValidateNested } from 'class-validator';
import { DeliveryDataDto } from './delivery-data.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario que realiza la compra',
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del producto que se desea comprar',
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Cantidad de unidades a comprar',
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    type: () => DeliveryDataDto,
    description: 'Información de entrega del pedido',
  })
  @ValidateNested()
  @Type(() => DeliveryDataDto)
  delivery: DeliveryDataDto;
}
