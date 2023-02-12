import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../service/product.service';

export class ProductController {

  static async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await ProductService.getAll());
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
      const newUserId = await ProductService.create(req.body as any);
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
      await ProductService.update(+req.params.id, req.body as any);
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
      await ProductService.delete(+req.params.id);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(404).json(e);
    }
    next();
  }

  static async getAllBySupplierId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const products = await ProductService.getAllBySupplierId(+req.params.id);
      res.status(200).json(products);
    } catch (e) {
      console.log(e);
      res.status(404).json(e);
    }
    next();
  }


}

