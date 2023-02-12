import { NextFunction, Request, Response } from 'express';
import { DashboardService } from '../service/dashboard.service';
import { AuthService } from '../service/auth.service';

export class DashboardController {
    static async get(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = {
                salesToday: await DashboardService.salesToday(),
                salesThisWeek: await DashboardService.salesThisWeek(),
                salesThisMonth: await DashboardService.salesThisMonth(),
                salesLastMonth: await DashboardService.salesLastMonth(),
                salesThisYear: await DashboardService.salesThisYear(),
                productLowStock: await DashboardService.lowStockProduct(),
                productExpired: await DashboardService.expiredProduct(),
            }
            res.status(200).json(result);
            next();
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
            next();
        }
    }
}

