import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const productRoute = Router();

productRoute.get('/product/supplier/:id', JwtMiddleware.verify, ProductController.getAllBySupplierId);

productRoute.get('/product', JwtMiddleware.verify, ProductController.getAll);

productRoute.post('/product', JwtMiddleware.verify, ProductController.create);

productRoute.put('/product/:id', JwtMiddleware.verify, ProductController.update);

productRoute.delete('/product/:id', JwtMiddleware.verify, ProductController.delete);

export default productRoute;