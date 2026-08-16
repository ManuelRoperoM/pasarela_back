import { Delivery } from '../entities/delivery.entity';

export abstract class DeliveryRepository {
  abstract save(delivery: Delivery): Promise<Delivery>;

  abstract findById(id: number): Promise<Delivery | null>;

  abstract findByTransactionId(transactionId: number): Promise<Delivery | null>;
}
