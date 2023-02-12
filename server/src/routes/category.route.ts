import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const categoryRoute = Router();

categoryRoute.get('/category', JwtMiddleware.verify, CategoryController.getAll);

categoryRoute.post('/category', JwtMiddleware.verify, CategoryController.create);

categoryRoute.put('/category/:id', JwtMiddleware.verify, CategoryController.update);

categoryRoute.delete('/category/:id', JwtMiddleware.verify, CategoryController.delete);

export default categoryRoute;



