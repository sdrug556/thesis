export const config = {
  port: 4201,
  jwtSecretKey: '25a6d0ecae2474b6f7872480d2d1aee6',
  // database: {
  //   username: 'postgres', // process.env.PGUSER,
  //   password: 'A1a$', // process.env.PGPASSWORD,
  //   database: 'pos', // process.env.PGDATABASE,
  //   port: 5432,
  //   host: 'localhost', // process.env.PGHOST,
  // }
  database: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: 5432,
    host: process.env.PGHOST,
  }
};

