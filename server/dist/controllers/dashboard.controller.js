"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("../service/dashboard.service");
class DashboardController {
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = {
                    salesToday: yield dashboard_service_1.DashboardService.salesToday(),
                    salesThisWeek: yield dashboard_service_1.DashboardService.salesThisWeek(),
                    salesThisMonth: yield dashboard_service_1.DashboardService.salesThisMonth(),
                    salesLastMonth: yield dashboard_service_1.DashboardService.salesLastMonth(),
                    salesThisYear: yield dashboard_service_1.DashboardService.salesThisYear(),
                    productLowStock: yield dashboard_service_1.DashboardService.lowStockProduct(),
                    productExpired: yield dashboard_service_1.DashboardService.expiredProduct(),
                };
                res.status(200).json(result);
                next();
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
                next();
            }
        });
    }
}
exports.DashboardController = DashboardController;
