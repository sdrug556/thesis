import { AuthController } from '../controllers/auth.controller';
import { Router } from 'express';
import { JwtMiddleware } from '../middleware/jwt.middleware';

const authRoute = Router();

authRoute.post('/login', AuthController.login);

authRoute.get('/logout', JwtMiddleware.verify, AuthController.logout);

export default authRoute;
