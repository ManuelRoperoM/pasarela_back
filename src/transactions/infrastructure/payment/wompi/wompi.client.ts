import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WompiAcceptanceResponse } from './dto/wompi-acceptance-response.dto';
import { WompiCardTokenResponse } from './dto/wompi-card-token-response.dto';
import { WompiTransactionResponse } from './dto/wompi-transaction-response.dto';

@Injectable()
export class WompiClient {
  constructor(private readonly configService: ConfigService) {}

  private get baseUrl(): string {
    return this.configService.getOrThrow<string>('wompi.baseUrl');
  }

  private get publicKey(): string {
    return this.configService.getOrThrow<string>('wompi.publicKey');
  }

  private get privateKey(): string {
    return this.configService.getOrThrow<string>('wompi.privateKey');
  }

  async tokenizeCard(card: {
    number: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  }): Promise<string> {
    const response = await fetch(`${this.baseUrl}/tokens/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.publicKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: card.number,
        cvc: card.cvc,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        card_holder: card.cardHolder,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `Wompi tokenization failed: ${response.status} - ${errorBody}`,
      );
    }
    const data = (await response.json()) as WompiCardTokenResponse;

    return data.data.id;
  }

  async getAcceptanceTokens(): Promise<{
    acceptanceToken: string;
    personalDataAuth: string;
  }> {
    const response = await fetch(`${this.baseUrl}/merchants/${this.publicKey}`);

    if (!response.ok) {
      throw new Error('Failed to get acceptance tokens');
    }

    const data = (await response.json()) as WompiAcceptanceResponse;

    return {
      acceptanceToken: data.data.presigned_acceptance.acceptance_token,

      personalDataAuth: data.data.presigned_personal_data_auth.acceptance_token,
    };
  }

  async createTransaction(data: {
    reference: string;
    amountInCents: number;
    currency: string;
    customerEmail: string;
    cardToken: string;
    installments: number;
    acceptanceToken: string;
    personalDataAuth: string;
    signature: string;
  }): Promise<WompiTransactionResponse['data']> {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        acceptance_token: data.acceptanceToken,
        accept_personal_auth: data.personalDataAuth,
        amount_in_cents: data.amountInCents,
        currency: data.currency,
        customer_email: data.customerEmail,
        reference: data.reference,

        payment_method: {
          type: 'CARD',
          token: data.cardToken,
          installments: data.installments,
        },

        signature: data.signature,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Wompi transaction');
    }

    const responseData = (await response.json()) as WompiTransactionResponse;

    return responseData.data;
  }

  async getTransaction(transactionId: string) {
    const response = await fetch(
      `${this.baseUrl}/transactions/${transactionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `Failed to get Wompi transaction: ${response.status} - ${errorBody}`,
      );
    }

    const data = (await response.json()) as WompiTransactionResponse;
    return data;
  }
}
