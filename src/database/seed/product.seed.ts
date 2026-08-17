import 'dotenv/config';
import { DataSource } from 'typeorm';

import { ProductOrmEntity } from '../../products/infrastructure/persistence/entities/product.orm-entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ProductOrmEntity],
});

async function seed() {
  await dataSource.initialize();

  const productRepository = dataSource.getRepository(ProductOrmEntity);

  const products = [
    productRepository.create({
      name: 'Camiseta básica',
      description: 'Camiseta básica de algodón para uso diario',
      price: 50000,
      stock: 20,
      imageUrl: '/images/camiseta.jpeg',
    }),

    productRepository.create({
      name: 'Gorra deportiva',
      description: 'Gorra deportiva ajustable',
      price: 30000,
      stock: 15,
      imageUrl: '/images/gorra.jpeg',
    }),

    productRepository.create({
      name: 'Chaqueta impermeable',
      description: 'Chaqueta impermeable para exteriores',
      price: 120000,
      stock: 10,
      imageUrl: '/images/chaqueta.jpeg',
    }),
  ];

  await productRepository.save(products);

  console.log('Products seed completed successfully');

  await dataSource.destroy();
}

seed().catch(async (error) => {
  console.error('Error running products seed:', error);
  await dataSource.destroy();
  process.exit(1);
});
