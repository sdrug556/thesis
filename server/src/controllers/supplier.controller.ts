import { NextFunction, Request, Response } from 'express';
import { SupplierService } from '../service/supplier.service';

export class SupplierController {

  static async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await SupplierService.getAll());
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
      const newUserId = await SupplierService.create(req.body as any);
      res.status(201).json({ id: newUserId });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await SupplierService.update(+req.params.id, req.body as any);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
    next();
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await SupplierService.delete(+req.params.id);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(404).json(e);
    }
    next();
  }


}


