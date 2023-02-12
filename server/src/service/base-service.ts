import { AppDataSource } from "../data-source";
import { dateNowUTC } from "../utilities/date";

interface ItemBase {
  createdDate?: number;
  isDeleted?: boolean; 
  id?: number;
}

export abstract class BaseService<T extends ItemBase> {

  public async getAll(repoName: string): Promise<T[]> {
    const repo = AppDataSource.getRepository<T>(repoName);
    return await repo.find();
  }
  
  public async create(item: T, repoName: string): Promise<number> {
    const repo = AppDataSource.getRepository(repoName);
    item.createdDate = dateNowUTC();
    item.isDeleted = false;
    const newProduct = await repo.manager.save(item);
    return newProduct.id;
  }

  public async update(id: number, product: Partial<T>, repoName: string): Promise<boolean> {
    const repo = AppDataSource.getRepository(repoName);
    const productData = await repo.findOneByOrFail({ id });
    if (!productData) { throw new Error('product not found'); }
    await repo.manager.save({ ...productData as any, ...product });
    return true;
  }

  public async delete(id: number, repoName: string): Promise<boolean> {
    // @ts-ignore-next
    return this.update(id, { isDeleted: true }, repoName);
  }

}
