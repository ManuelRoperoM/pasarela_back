// import { Delivery } from '../../domain/entities/delivery.entity';
import { Delivery } from 'src/deliveries/domain/entities/delivery.entity';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';

export class DeliveryMapper {
  static toDomain(entity: DeliveryOrmEntity): Delivery {
    return new Delivery(
      entity.id,
      entity.transactionId,
      entity.address,
      entity.city,
      entity.department,
      entity.postalCode,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toOrm(delivery: Delivery): DeliveryOrmEntity {
    const entity = new DeliveryOrmEntity();

    entity.id = delivery.id;
    entity.transactionId = delivery.transactionId;
    entity.address = delivery.address;
    entity.city = delivery.city;
    entity.department = delivery.department;
    entity.postalCode = delivery.postalCode;
    entity.status = delivery.status;
    entity.createdAt = delivery.createdAt;
    entity.updatedAt = delivery.updatedAt;

    return entity;
  }
}
