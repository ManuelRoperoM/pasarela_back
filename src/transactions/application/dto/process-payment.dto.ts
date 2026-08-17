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
  @IsCreditCard()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  expMonth: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  expYear: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 4)
  cvc: string;

  @IsString()
  @IsNotEmpty()
  cardHolder: string;

  @IsInt()
  @Min(1)
  @Max(36)
  installments: number;
}
