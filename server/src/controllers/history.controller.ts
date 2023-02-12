import { NextFunction, Request, Response } from "express";
import { HistoryService } from '../service/history.service';
import { UserService } from '../service/user.service';

export class HistoryController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json(await HistoryService.getAll());
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
      next();
    }
  } 
}

