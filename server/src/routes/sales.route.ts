import { Router } from 'express';
import { SaleController } from '../controllers/sales.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const saleRoute = Router();

saleRoute.get('/sale/today', JwtMiddleware.verify, SaleController.today);

saleRoute.get('/sale', JwtMiddleware.verify, SaleController.get);

saleRoute.post('/sale/cancel', JwtMiddleware.verify, SaleController.cancel);

saleRoute.post('/sale', JwtMiddleware.verify, SaleController.create);

export default saleRoute;
