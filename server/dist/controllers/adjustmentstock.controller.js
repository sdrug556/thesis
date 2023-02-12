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
exports.AdjustmentStockController = void 0;
const adjustmentstock_service_1 = require("../service/adjustmentstock.service");
const date_1 = require("../utilities/date");
class AdjustmentStockController {
    static getAll(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield adjustmentstock_service_1.AdjustmentStockService.getAll();
                res.json(categories);
                res.status(200);
                next();
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
                next();
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore-next
                const adjustment = req.body.map(a => {
                    // @ts-ignore-next
                    a.userId = req.body.createdBy;
                    a.createdDate = (0, date_1.dateNowUTC)();
                    return a;
                });
                const categories = yield adjustmentstock_service_1.AdjustmentStockService.create(adjustment);
                res.json(categories);
                res.status(200);
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
}
exports.AdjustmentStockController = AdjustmentStockController;
