import { Router } from 'express';
import { SupplierController } from '../controllers/supplier.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const supplierRoute = Router();

supplierRoute.get('/supplier', JwtMiddleware.verify, SupplierController.getAll);

supplierRoute.post('/supplier', JwtMiddleware.verify, SupplierController.create);

supplierRoute.put('/supplier/:id', JwtMiddleware.verify, SupplierController.update);

supplierRoute.delete('/supplier/:id', JwtMiddleware.verify, SupplierController.delete);

export default supplierRoute;



