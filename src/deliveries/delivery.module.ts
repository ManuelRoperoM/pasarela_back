import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeliveryOrmEntity } from './infrastructure/persistence/entities/delivery.orm-entity';
import { DeliveryTypeOrmRepository } from './infrastructure/persistence/repositories/delivery.typeorm-repository';
import { DeliveryRepository } from './domain/repositories/delivery.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrmEntity])],
  providers: [
    DeliveryTypeOrmRepository,
    {
      provide: DeliveryRepository,
      useExisting: DeliveryTypeOrmRepository,
    },
  ],
  exports: [DeliveryRepository],
})
export class DeliveriesModule {}
