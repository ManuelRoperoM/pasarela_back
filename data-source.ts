import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { ProductOrmEntity } from './src/products/infrastructure/persistence/entities/product.orm-entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [ProductOrmEntity],

  migrations: ['src/database/migrations/*.ts'],
});
