import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class TransactionReferenceService {
  generate(): string {
    const timestamp = Date.now();

    const random = randomBytes(4).toString('hex').toUpperCase();

    return `TRX-${timestamp}-${random}`;
  }
}
