import { DeliveryStatus } from '../enums/delivery-status.enum';

export class Delivery {
  constructor(
    public readonly id: number,
    public readonly transactionId: number,
    public readonly address: string,
    public readonly city: string,
    public readonly department: string,
    public readonly postalCode: string,
    public status: DeliveryStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
