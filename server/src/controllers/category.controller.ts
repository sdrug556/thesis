import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../service/category.service';

export class CategoryController {

  static async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categories = await CategoryService.getAll();
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
      const id = await CategoryService.create(req.body as any);
      res.status(201).json({ id: id });
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
      await CategoryService.update(+req.params.id, req.body as any);
      res.status(200).json({});
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
      await CategoryService.delete(+req.params.id);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.status(404).json(e);
    }
    next();
    return;
  }


}


