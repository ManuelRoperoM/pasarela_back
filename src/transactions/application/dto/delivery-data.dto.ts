import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class DeliveryDataDto {
  @ApiProperty({
    example: 'Calle 123 #45-67',
    description: 'Dirección donde se realizará la entrega',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  address: string;

  @ApiProperty({
    example: 'Bogotá',
    description: 'Ciudad de entrega',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @ApiProperty({
    example: 'Cundinamarca',
    description: 'Departamento de entrega',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  department: string;

  @ApiProperty({
    example: '110111',
    description: 'Código postal',
  })
  @IsString()
  @IsNotEmpty()
  postalCode: string;
}
