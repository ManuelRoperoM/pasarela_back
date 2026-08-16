import { Type } from 'class-transformer';
import { IsInt, IsPositive, ValidateNested } from 'class-validator';
import { DeliveryDataDto } from './delivery-data.dto';

export class CreateTransactionDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @ValidateNested()
  @Type(() => DeliveryDataDto)
  delivery: DeliveryDataDto;
}
