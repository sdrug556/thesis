import { User } from '../entity/User';
import { dateNowUTC } from '../utilities/date';
import { AppDataSource } from '../data-source';

export class UserService {

  static async getAll(): Promise<User[]> {
    const repo = AppDataSource.getRepository(User);
    return await repo.find();
  }
  
  static async create(user: User): Promise<number> {
    const repo = AppDataSource.getRepository(User);
    user.createdDate = dateNowUTC();
    user.isDeleted = false;
    user.emailConfirmed = true;
    if (user.allowLogin === undefined || user.allowLogin === null) {
      user.allowLogin = true;
    }
    const newUser = await repo.manager.save(repo.create(user));
    return newUser.id;
  }

  static async update(id: number, user: Partial<User>): Promise<boolean> {
    const repo = AppDataSource.getRepository(User);
    const userData = await repo.findOneByOrFail({ id });
    if (!userData) { throw new Error('user not found'); }
    await repo.manager.save({ ...userData, ...user });
    return true;
  }

  static async delete(id: number): Promise<boolean> {
    return this.update(id, { isDeleted: true })
  }

}
