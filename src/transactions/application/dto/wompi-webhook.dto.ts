import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class WompiTransactionDto {
  @IsString()
  id: string;

  @IsString()
  reference: string;

  @IsNumber()
  amount_in_cents: number;

  @IsString()
  currency: string;

  @IsString()
  status: string;
}

export class WompiWebhookDataDto {
  @ValidateNested()
  @Type(() => WompiTransactionDto)
  transaction: WompiTransactionDto;
}

export class WompiSignatureDto {
  @IsArray()
  @IsString({ each: true })
  properties: string[];

  @IsString()
  checksum: string;
}

export class WompiWebhookDto {
  @IsString()
  event: string;

  @ValidateNested()
  @Type(() => WompiWebhookDataDto)
  data: WompiWebhookDataDto;

  @ValidateNested()
  @Type(() => WompiSignatureDto)
  signature: WompiSignatureDto;

  @IsNumber()
  timestamp: number;

  @IsString()
  environment: string;
}
