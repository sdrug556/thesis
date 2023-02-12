import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { config } from './app.config';
import { Category } from './entity/Category';
import { Invoice } from './entity/Invoice';
import { Product } from './entity/Product';
import { Supplier } from './entity/Supplier';
import { AdjustmentStock } from './entity/adjustmentstock';
import { History } from './entity/History';
import { Sales } from './entity/Sales';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Category,
    Invoice,
    Product,
    Supplier,
    AdjustmentStock,
    History,
    Sales,
  ],
  migrations: ['./migration/1676078473069-initial.ts'],
  subscribers: [],
});
