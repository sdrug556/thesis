import { AppDataSource } from '../data-source';
import { Supplier, TABLE_supplier } from '../entity/Supplier';
import { dateNowUTC } from '../utilities/date';

export class SupplierService {

  static async getAll(): Promise<Supplier[]> {
    const repo = AppDataSource.getRepository(Supplier);
    return await repo.find({
      order: {
        id: 'ASC'
      },
      where: {
        isDeleted: false
      }
    });
  }
  
  static async create(supplier: Supplier): Promise<number> {
    const repo = AppDataSource.getRepository<Supplier>(TABLE_supplier);
    supplier.createdDate = dateNowUTC();
    supplier.isDeleted = false;
    const newSupplier = await repo.manager.save(repo.create(supplier));
    return newSupplier.id;
  }

  static async update(id: number, product: Partial<Supplier>): Promise<boolean> {
    const repo = AppDataSource.getRepository(Supplier);
    const supplierData = await repo.findOneByOrFail({ id });
    if (!supplierData) { throw new Error('product not found'); }
    await repo.manager.save(repo.create({ ...supplierData as any, ...product }));
    return true;
  }

  static async delete(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Supplier);
    const supplierData = await repo.findOneByOrFail({ id });
    if (!supplierData) { throw new Error('product not found'); }
    await repo.manager.save(repo.create({ ...supplierData as any, ...{ isDeleted: true } }));
    return true;
  }

}


