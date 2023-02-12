import { sign } from 'jsonwebtoken';
import { config } from '../app.config';
import { AppDataSource } from '../data-source';
import { User, TABLE_user } from '../entity/User';
import { HistoryService } from './history.service';

export class AuthService {

  static async login(data: {
    email: string;
    password: string;
  }): Promise<string | null> {
    const repo = AppDataSource.getRepository<User>(TABLE_user);
    const user = await repo.findOneBy({ email: data.email, password: data.password });
    if (!user) { return null; }
    await HistoryService.add(user.id, 'Login');
    return sign({ user }, config.jwtSecretKey);
  }

  static async logout(userId: number): Promise<boolean> {
    await HistoryService.add(userId, 'Logout');
    return true;
  }

}
