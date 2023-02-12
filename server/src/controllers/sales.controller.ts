import { NextFunction, Request, Response } from 'express';
import { SaleService } from '../service/sale.service';

export class SaleController {

  static async today(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await SaleService.today());
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  } 

  static async get(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await SaleService.get());
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await SaleService.create(req.body.createdBy, req.body));
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  }

  static async cancel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await SaleService.cancel(req.body.createdBy, req.body));
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  }

}

