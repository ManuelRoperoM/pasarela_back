import { Injectable } from '@nestjs/common';

export interface TransactionPricing {
  productAmount: number;
  baseFee: number;
  deliveryFee: number;
  totalAmount: number;
}

@Injectable()
export class TransactionPricingService {
  private readonly BASE_FEE = 1000;
  private readonly DELIVERY_FEE = 5000;

  calculate(productPrice: number, quantity: number): TransactionPricing {
    const productAmount = productPrice * quantity;

    const totalAmount = productAmount + this.BASE_FEE + this.DELIVERY_FEE;

    return {
      productAmount,
      baseFee: this.BASE_FEE,
      deliveryFee: this.DELIVERY_FEE,
      totalAmount,
    };
  }
}
