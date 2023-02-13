import { createPostgresDatabase, checkDatabase } from 'typeorm-extension';
import app from './app';
import { config } from './app.config';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

async function addAdminUser(): Promise<void> {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.find({
    where: { email: 'admin@gmail.com' },
    take: 1,
  });
  if (!user?.length) {
    const admin = userRepo.create({
      address: 'pampanga',
      allowLogin: true,
      birthday: Date.now(),
      createdDate: Date.now(),
      email: 'admin@gmail.com',
      emailConfirmed: true,
      firstName: 'admin',
      lastName: 'hyperdrug',
      phone: '123456789',
      password: 'admin',
      isDeleted: false,
      type: 1,
    });
    await userRepo.manager.save(admin);
  }
}

(async () => {
  const initializeDatabase = () => {
      AppDataSource.initialize()
        .then(async () => {
          console.log('my successfully initialize database connection');

          // await addAdminUser();

          app.listen(config.port, () => {
            console.log(`server is running on port ${config.port}`);
          });
        })
        .catch((error) => console.log('my error: ', error));
  }
  // const result = await checkDatabase({
  //   dataSource: AppDataSource,
  // })
  // console.log('my result: ', result);
  // if (result.exists) {
  //   return initializeDatabase();
  // }
  createPostgresDatabase({
    ifNotExist: true,
    initialDatabase: 'postgres',
    options: {
      ...config.database,
      type: 'postgres',
    },
  })
    .then(() => {
      console.log('my database successfully initialized!');
      initializeDatabase();
    })
    .catch((err) => {
      console.log('my create database error: ', err);
    });
})();
