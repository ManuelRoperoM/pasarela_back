import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  //   abstract create(product: Product): Promise<Product>;

  abstract findById(id: number): Promise<Product | null>;

  abstract findAll(): Promise<Product[]>;

  abstract update(product: Product): Promise<Product>;

  //   abstract delete(id: string): Promise<void>;
}
