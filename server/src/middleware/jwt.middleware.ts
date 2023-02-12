import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../app.config';

export class JwtMiddleware {

  public static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerHeader = req.headers.authorization as string;
      if (bearerHeader) {
        const jwtToken = bearerHeader.split(' ')[1];
        verify(jwtToken, config.jwtSecretKey, (err, decoded) => {
          if (err) {
            res.sendStatus(401);
          } else {
            // @ts-ignore-next
            req.body.createdBy = decoded.user.id
          }
        });
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
    next();
  }

}
