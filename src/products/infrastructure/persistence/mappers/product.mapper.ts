import { Product } from '../../../domain/entities/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';

export class ProductMapper {
  static toDomain(entity: ProductOrmEntity): Product {
    return new Product(
      entity.id,
      entity.name,
      entity.description,
      Number(entity.price),
      entity.stock,
      entity.imageUrl,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(product: Product): ProductOrmEntity {
    const entity = new ProductOrmEntity();

    entity.id = product.id;
    entity.name = product.name;
    entity.description = product.description;
    entity.price = product.price;
    entity.stock = product.stock;
    entity.imageUrl = product.imageUrl;
    entity.createdAt = product.createdAt;
    entity.updatedAt = product.updatedAt;

    return entity;
  }
}
