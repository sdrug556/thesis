import { AdjustmentStock, TABLE_AdjustmentStock } from '../entity/adjustmentstock';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/Category';
import { Product, TABLE_product } from '../entity/Product';
import { In } from 'typeorm';
import { TABLE_user } from '../entity/User';

export async function adjustProductStock(adjustments: {
  productId: number;
  stock: number;
}[]) {
  const repoProduct = AppDataSource.getRepository(Product);
  const products = await repoProduct.find({
    where: {
      id: In(adjustments.map((a) => a.productId))
    }
  });
  products.forEach(async (product) => {
    const adjustment = adjustments.find(a => a.productId == product.id);
    product.stock = (product.stock ?? 0) + adjustment.stock;
  });
  return await repoProduct.manager.save(products);
}

export class AdjustmentStockService {

  static async getAll(): Promise<Category[]> {
    const query = `
      SELECT ras.id as "id",
             ras.stock AS "stock",
             ras."createdDate" AS "createdDate" ,
             rp."name" AS "productName",
             ru."firstName" , ru."lastName"
      FROM  "${TABLE_AdjustmentStock}" ras
              INNER JOIN "${TABLE_product}" rp ON ras."productId" = rp."id"
              INNER JOIN "${TABLE_user}" ru ON ras."userId" = ru."id" 
    `;
    const result = await AppDataSource.query(query);
    return result.map(res => {
      res.user = res.firstName + ' ' + res.lastName;
      return res;
    });
  }
  
  static async create(adjustmentStock: AdjustmentStock[]): Promise<boolean> {
    const repo = AppDataSource.getRepository(AdjustmentStock);
    const newAdjustments = adjustmentStock.map((a) => repo.create(a));
    const newCategory = await repo.manager.save(newAdjustments);
    await adjustProductStock(adjustmentStock.map(a => {
      return {
        productId: a.productId,
        stock: a.stock
      }
    }));
    return true;
  }

}
