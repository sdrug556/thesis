import { AppDataSource } from '../data-source';
import { Sales, TABLE_sales } from '../entity/Sales';
import { BaseService } from './base-service';
import { Product, TABLE_product } from '../entity/Product';
import { In } from 'typeorm';
import { endOfToday, startOfToday } from 'date-fns';
import { User, TABLE_user } from '../entity/User';

interface CancelInfo {
  addToInventory: boolean;
  cancelQty: number;
  cancelReason: string;
  productId: number;
  id: number;
  email: string;
  password: string;
}

export class SaleService extends BaseService<Sales> {

  static async get(): Promise<any[]> {
    const query = `
      SELECT sales.id, sales.price, sales.quantity, sales."invoiceNumber" , sales.discount, sales."createdDate" ,
             product."name" "productName", product.supplier , product.category,
             CONCAT("firstName", ' ', "lastName") name
      FROM "${TABLE_sales}" sales
      inner join "${TABLE_product}" product on sales."productId" = product."id"
      inner join "${TABLE_user}" u on sales."createdBy"  = u.id 
      order by sales.id desc 
    `;
    return await AppDataSource.query(query);
  }

  static async today(): Promise<Sales[]> {
    const query = `
        SELECT sales.id, sales.price, sales.quantity, sales."invoiceNumber" , sales.discount, sales."createdDate" ,
               product."name" "productName", product.supplier , product.category, product.id "productId",
               CONCAT("firstName", ' ', "lastName") name
        FROM "${TABLE_sales}" sales
        inner join "${TABLE_product}" product on sales."productId" = product."id"
        inner join "${TABLE_user}" u on sales."createdBy"  = u.id
        where sales."createdDate" > ${+startOfToday()} and sales."createdDate" < ${+endOfToday()}
        order by sales.id desc 
      `;
    return await AppDataSource.query(query);
  }

  static async create(userId: number, sales: Sales[]): Promise<boolean> {
    const salesRepo = AppDataSource.getRepository(Sales);
    const productRepo = AppDataSource.getRepository(Product);

    const productIds = sales.map(s => s.productId);
    let products = await productRepo.find({
      where: {
        id: In(productIds)
      }
    });

    sales = sales.map(sale => {
      sale.createdBy = userId;
      sale.createdDate = Date.now()
      return sale;
    });

    products = products.map(product => {
      const sale = sales.find(a => a.productId == product.id);
      if (sale) { product.stock = product.stock - sale.quantity; }
      return product;
    });
    await productRepo.manager.save(products.map(p => productRepo.create(p)));
    await salesRepo.manager.save(sales.map(s => salesRepo.create(s)));

    return;
  }

  static async cancel(userId: number, cancelInfo: CancelInfo): Promise<boolean> {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneOrFail({
      where: {
        email: cancelInfo.email,
        password: cancelInfo.password,
      }
    });
    if (!user) { return false; }
    const salesRepo = AppDataSource.getRepository(Sales);
    const productRepo = AppDataSource.getRepository(Product);
    const sale = await salesRepo.findOneOrFail({ where: { id: cancelInfo.id } });
    if (sale) {
      sale.quantity = sale.quantity - cancelInfo.cancelQty;
      if (sale.quantity <= 0) {
        await salesRepo.manager.remove(sale);
      } else {
        await salesRepo.manager.save(salesRepo.create(sale));
      }
    }
    if (cancelInfo.addToInventory) {
      const product = await productRepo.findOneOrFail({
        where: { id: cancelInfo.productId }
      });
      product.stock = product.stock + cancelInfo.cancelQty;
      await productRepo.manager.save(productRepo.create(product));
    }
    return true;
  }
}


