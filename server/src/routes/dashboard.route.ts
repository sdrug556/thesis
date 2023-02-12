import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const dashboardRoute = Router();

dashboardRoute.get('/dashboard', JwtMiddleware.verify, DashboardController.get);

export default dashboardRoute;
