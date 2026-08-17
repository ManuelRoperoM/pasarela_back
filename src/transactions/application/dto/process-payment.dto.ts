import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  Length,
} from 'class-validator';

export class ProcessPaymentDto {
  @ApiProperty({
    example: '4242424242424242',
    description: 'Número de tarjeta de crédito',
  })
  @IsCreditCard()
  cardNumber: string;

  @ApiProperty({
    example: '12',
    description: 'Mes de vencimiento de la tarjeta',
    minLength: 2,
    maxLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  expMonth: string;

  @ApiProperty({
    example: '30',
    description: 'Año de vencimiento de la tarjeta',
    minLength: 2,
    maxLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  expYear: string;

  @ApiProperty({
    example: '123',
    description: 'Código de seguridad de la tarjeta',
    minLength: 3,
    maxLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 4)
  cvc: string;

  @ApiProperty({
    example: 'MANUEL ROPERO',
    description: 'Nombre del titular de la tarjeta',
  })
  @IsString()
  @IsNotEmpty()
  cardHolder: string;

  @ApiProperty({
    example: 1,
    description: 'Número de cuotas del pago',
    minimum: 1,
    maximum: 36,
  })
  @IsInt()
  @Min(1)
  @Max(36)
  installments: number;
}
