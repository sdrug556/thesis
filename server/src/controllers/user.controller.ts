import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await UserService.getAll());
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
      const newUserId = await UserService.create(req.body as any);
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
      await UserService.update(+req.query.id, req.body as any);
      res.status(200);
      next();
    } catch (e) {
      res.status(500).json(e);
      next();
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await UserService.delete(+req.query.id);
      res.status(200);
      next();
    } catch (e) {
      console.log(e);
      res.status(404).json(e);
      next();
    }
  }

}
