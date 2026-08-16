import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class DeliveryDataDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  department: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;
}
