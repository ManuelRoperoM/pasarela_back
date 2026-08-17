import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class WompiSignatureService {
  constructor(private readonly configService: ConfigService) {}

  generate(reference: string, amountInCents: number, currency: string): string {
    const integritySecret = this.configService.getOrThrow<string>(
      'wompi.integritySecret',
    );

    const data = `${reference}${amountInCents}${currency}${integritySecret}`;

    return createHash('sha256').update(data).digest('hex');
  }
}
