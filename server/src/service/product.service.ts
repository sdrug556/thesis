import { dateNowUTC } from '../utilities/date';
import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';
import { BaseService } from './base-service';

export class ProductService extends BaseService<Product> {

  REPO_NAME = 'repoProduct';

  static async getAll(): Promise<Product[]> {
    const repo = AppDataSource.getRepository(Product);
    return await repo.find({
      order: {
        id: 'ASC'
      },
      where: {
        isDeleted: false
      }
    });
  }
  
  static async create(user: Product): Promise<number> {
    const repo = AppDataSource.getRepository(Product);
    user.createdDate = dateNowUTC();
    user.isDeleted = false;
    const newProduct = await repo.manager.save(repo.create(user));
    return newProduct.id;
  }

  static async update(id: number, product: Partial<Product>): Promise<boolean> {
    const repo = AppDataSource.getRepository(Product);
    const productData = await repo.findOneByOrFail({ id });
    if (!productData) { throw new Error('product not found'); }
    await repo.manager.save(repo.create({ ...productData, ...product }));
    return true;
  }

  static async delete(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Product);
    const productData = await repo.findOneByOrFail({ id });
    if (!productData) { throw new Error('product not found'); }
    await repo.manager.save(repo.create({ ...productData, ...{ isDeleted: true } }));
    return true;
  }

  static async getAllBySupplierId(id: number): Promise<Product[]> {
    const repo = AppDataSource.getRepository(Product);
    return await repo.find({
      where: {
        supplier: id
      }
    })
  }

}

