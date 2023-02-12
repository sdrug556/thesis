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
exports.SaleController = void 0;
const sale_service_1 = require("../service/sale.service");
class SaleController {
    static today(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield sale_service_1.SaleService.today());
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
    static get(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield sale_service_1.SaleService.get());
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield sale_service_1.SaleService.create(req.body.createdBy, req.body));
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
    static cancel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield sale_service_1.SaleService.cancel(req.body.createdBy, req.body));
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
}
exports.SaleController = SaleController;
