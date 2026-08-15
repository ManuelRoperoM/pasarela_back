import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductTypeOrmRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async update(product: Product): Promise<Product> {
    const entity = ProductMapper.toPersistence(product);

    const updatedEntity = await this.repository.save(entity);

    return ProductMapper.toDomain(updatedEntity);
  }
}
