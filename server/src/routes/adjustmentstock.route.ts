import { Router } from 'express';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { AdjustmentStockController } from '../controllers/adjustmentstock.controller';

const adjustmentstockRoute = Router();

adjustmentstockRoute.get('/adjustmentstock', JwtMiddleware.verify, AdjustmentStockController.getAll);

adjustmentstockRoute.post('/adjustmentstock', JwtMiddleware.verify, AdjustmentStockController.create);

export default adjustmentstockRoute;




