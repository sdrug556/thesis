import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body?.email && !req.body?.password) {
      res.status(401);
    } else {
      const result = await AuthService.login(req.body);
      if (result) {
        res.send({ token: result });
      } else {
        res.status(401);
      }
    }
    next();
  }

  public static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = await AuthService.logout(req.body.createdBy);
    if (result) {
      res.status(200).send('');
    } else {
      res.status(401);
    }
    next();
  }


}
