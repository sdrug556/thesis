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
exports.AdjustmentStockService = exports.adjustProductStock = void 0;
const adjustmentstock_1 = require("../entity/adjustmentstock");
const data_source_1 = require("../data-source");
const Product_1 = require("../entity/Product");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
function adjustProductStock(adjustments) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoProduct = data_source_1.AppDataSource.getRepository(Product_1.Product);
        const products = yield repoProduct.find({
            where: {
                id: (0, typeorm_1.In)(adjustments.map((a) => a.productId))
            }
        });
        products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const adjustment = adjustments.find(a => a.productId == product.id);
            product.stock = ((_a = product.stock) !== null && _a !== void 0 ? _a : 0) + adjustment.stock;
        }));
        return yield repoProduct.manager.save(products);
    });
}
exports.adjustProductStock = adjustProductStock;
class AdjustmentStockService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT ras.id as "id",
             ras.stock AS "stock",
             ras."createdDate" AS "createdDate" ,
             rp."name" AS "productName",
             ru."firstName" , ru."lastName"
      FROM  "${adjustmentstock_1.TABLE_AdjustmentStock}" ras
              INNER JOIN "${Product_1.TABLE_product}" rp ON ras."productId" = rp."id"
              INNER JOIN "${User_1.TABLE_user}" ru ON ras."userId" = ru."id" 
    `;
            const result = yield data_source_1.AppDataSource.query(query);
            return result.map(res => {
                res.user = res.firstName + ' ' + res.lastName;
                return res;
            });
        });
    }
    static create(adjustmentStock) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(adjustmentstock_1.AdjustmentStock);
            const newAdjustments = adjustmentStock.map((a) => repo.create(a));
            const newCategory = yield repo.manager.save(newAdjustments);
            yield adjustProductStock(adjustmentStock.map(a => {
                return {
                    productId: a.productId,
                    stock: a.stock
                };
            }));
            return true;
        });
    }
}
exports.AdjustmentStockService = AdjustmentStockService;
