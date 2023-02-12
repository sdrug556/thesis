import { NextFunction, Request, Response } from 'express';
import { AdjustmentStockService } from '../service/adjustmentstock.service';
import { AdjustmentStock } from '../entity/adjustmentstock';
import { dateNowUTC } from '../utilities/date';

export class AdjustmentStockController {

  static async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categories = await AdjustmentStockService.getAll();
      res.json(categories);
      res.status(200);
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      next();
    }
  }
  
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // @ts-ignore-next
      const adjustment = req.body.map(a => {
        // @ts-ignore-next
        a.userId = req.body.createdBy;
        a.createdDate = dateNowUTC();
        return a;
      });
      const categories = await AdjustmentStockService.create(adjustment);
      res.json(categories);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  }


}


