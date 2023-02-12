import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const userRoute = Router();

userRoute.get('/user', JwtMiddleware.verify, UserController.getAll);

userRoute.post('/user', JwtMiddleware.verify, UserController.create);

userRoute.put('/user/:id', JwtMiddleware.verify, UserController.update);

userRoute.delete('/user/:id', JwtMiddleware.verify, UserController.delete);

export default userRoute;

