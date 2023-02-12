import { Router } from 'express';
import { HistoryController } from '../controllers/history.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const historyRoute = Router();

historyRoute.get('/history/login', JwtMiddleware.verify, HistoryController.getAll);

export default historyRoute;