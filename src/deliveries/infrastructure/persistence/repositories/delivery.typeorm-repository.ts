import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { Delivery } from '../../domain/entities/delivery.entity';
// import { DeliveryRepository } from '../../domain/repositories/delivery.repository';
import { Delivery } from 'src/deliveries/domain/entities/delivery.entity';
import { DeliveryRepository } from 'src/deliveries/domain/repositories/delivery.repository';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';
import { DeliveryMapper } from '../mappers/delivery.mapper';

@Injectable()
export class DeliveryTypeOrmRepository implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryOrmEntity)
    private readonly repository: Repository<DeliveryOrmEntity>,
  ) {}

  async save(delivery: Delivery): Promise<Delivery> {
    const entity = DeliveryMapper.toOrm(delivery);

    const savedEntity = await this.repository.save(entity);

    return DeliveryMapper.toDomain(savedEntity);
  }

  async findById(id: number): Promise<Delivery | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async findByTransactionId(transactionId: number): Promise<Delivery | null> {
    const entity = await this.repository.findOne({
      where: { transactionId },
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }
}
