import { AppDataSource } from '../data-source';
import { Category } from '../entity/Category';
import { dateNowUTC } from '../utilities/date';
import { BaseService } from './base-service';

export class CategoryService extends BaseService<Category> {

  static async getAll(): Promise<Category[]> {
    const repo = AppDataSource.getRepository(Category);
    return await repo.find({
      order: { id: 'ASC' },
      where: {
        isDeleted: false
      }
    });
  }
  
  static async create(category: Category): Promise<number> {
    const repo = AppDataSource.getRepository(Category);
    const cat = repo.create({ ...category, ...{
      createdDate: dateNowUTC(),
      isDeleted: false
    } })
    const newCategory = await repo.manager.save(cat);
    // @ts-ignore-next
    return newCategory.id;
  }

  static async update(id: number, product: Partial<Category>): Promise<boolean> {
    const repo = AppDataSource.getRepository(Category);
    const categoryData = await repo.findOneByOrFail({ id });
    if (!categoryData) { throw new Error('product not found'); }
    await repo.manager.save(repo.create({...categoryData, ...product }));
    return true;
  }

  static async delete(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Category);
    return this.update(id, repo.create({ isDeleted: true }));
  }

}


