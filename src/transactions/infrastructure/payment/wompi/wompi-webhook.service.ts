import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, timingSafeEqual } from 'crypto';
import {
  WompiTransactionDto,
  WompiWebhookDto,
} from 'src/transactions/application/dto/wompi-webhook.dto';

@Injectable()
export class WompiWebhookService {
  private readonly integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

  validateSignature(dto: WompiWebhookDto): void {
    if (!this.integritySecret) {
      throw new Error('WOMPI_INTEGRITY_SECRET is not configured');
    }

    const transaction = dto.data.transaction;

    const values = dto.signature.properties.map((property) => {
      return this.getPropertyValue(transaction, property);
    });

    const concatenatedValues =
      values.join('') + dto.timestamp + this.integritySecret;

    const rawSignature = values.join('') + dto.timestamp + this.integritySecret;

    console.log('WOMPI SIGNATURE STRING:', rawSignature);

    const calculatedChecksum = createHash('sha256')
      .update(concatenatedValues)
      .digest('hex');

    const receivedChecksum = dto.signature.checksum;

    const calculatedBuffer = Buffer.from(calculatedChecksum);
    const receivedBuffer = Buffer.from(receivedChecksum);

    if (
      calculatedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(calculatedBuffer, receivedBuffer)
    ) {
      throw new UnauthorizedException('Invalid Wompi webhook signature');
    }
  }

  private getPropertyValue(
    transaction: WompiTransactionDto,
    property: string,
  ): string {
    const [, field] = property.split('.');

    const value = transaction[field as keyof WompiTransactionDto];

    if (value === undefined || value === null) {
      throw new UnauthorizedException(
        `Missing signature property: ${property}`,
      );
    }

    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean'
    ) {
      throw new UnauthorizedException(
        `Invalid signature property type: ${property}`,
      );
    }

    return value.toString();
  }
}
