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
exports.ProductController = void 0;
const product_service_1 = require("../service/product.service");
class ProductController {
    static getAll(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield product_service_1.ProductService.getAll());
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
                const newUserId = yield product_service_1.ProductService.create(req.body);
                res.status(201).json({ id: newUserId });
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_service_1.ProductService.update(+req.params.id, req.body);
                res.status(200);
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
            next();
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_service_1.ProductService.delete(+req.params.id);
                res.status(200);
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e);
            }
            next();
        });
    }
    static getAllBySupplierId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.ProductService.getAllBySupplierId(+req.params.id);
                res.status(200).json(products);
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e);
            }
            next();
        });
    }
}
exports.ProductController = ProductController;
