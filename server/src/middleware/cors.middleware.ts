import cors, { CorsOptions } from 'cors';

export class CorsMiddleware {
  public static corsOptions: CorsOptions = {
    origin: [
      'http://localhost:4200',
      'http://localhost:4201',
      'http://localhost:4202',
      'http://localhost:4204',
      'http://localhost:4205',
      'http://localhost:4206',
      'http://localhost:8080',
      'http://localhost:8081',
      'http://localhost:8082',
      'http://localhost:8083',
      'http://localhost:8084',
      'http://localhost:8085',
    ],
    optionsSuccessStatus: 204,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  public static cors() {
    return cors(CorsMiddleware.corsOptions);
  }
}
