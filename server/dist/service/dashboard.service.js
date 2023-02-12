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
exports.DashboardService = void 0;
const date_fns_1 = require("date-fns");
const data_source_1 = require("../data-source");
const Product_1 = require("../entity/Product");
const Sales_1 = require("../entity/Sales");
const User_1 = require("../entity/User");
function caculateProductTotal(price, qty, discount) {
    if (!discount) {
        return price * qty;
    }
    const discountPercentage = discount / 100;
    return price * qty - discountPercentage * price;
}
function rangeQuery(startDate, endDate) {
    const query = `
  SELECT sales.id, sales.price, sales.quantity, sales."invoiceNumber" , sales.discount, sales."createdDate" ,
         product."name" "productName", product.supplier , product.category,
         CONCAT("firstName", ' ', "lastName") name
  FROM "${Sales_1.TABLE_sales}" sales
  inner join "${Product_1.TABLE_product}" product on sales."productId" = product."id"
  inner join "${User_1.TABLE_user}" u on sales."createdBy"  = u.id 
  where sales."createdDate" > ${startDate} and sales."createdDate" < ${endDate}
  order by sales.id desc
`;
    return query;
}
function toUnix(date) {
    return +date;
}
class DashboardService {
    static salesToday() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = rangeQuery(toUnix((0, date_fns_1.startOfToday)()), toUnix((0, date_fns_1.endOfToday)()));
            const sales = (yield data_source_1.AppDataSource.query(query));
            return ((_a = sales === null || sales === void 0 ? void 0 : sales.reduce((cur, prev) => {
                return (cur + caculateProductTotal(prev.price, prev.quantity, prev.discount));
            }, 0)) !== null && _a !== void 0 ? _a : 0);
        });
    }
    static salesThisWeek() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = rangeQuery(toUnix((0, date_fns_1.startOfWeek)(new Date())), toUnix((0, date_fns_1.endOfWeek)(new Date())));
            const sales = (yield data_source_1.AppDataSource.query(query));
            return ((_a = sales === null || sales === void 0 ? void 0 : sales.reduce((cur, prev) => {
                return (cur + caculateProductTotal(prev.price, prev.quantity, prev.discount));
            }, 0)) !== null && _a !== void 0 ? _a : 0);
        });
    }
    static salesThisMonth() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = rangeQuery(toUnix((0, date_fns_1.startOfMonth)(new Date())), toUnix((0, date_fns_1.endOfMonth)(new Date())));
            const sales = (yield data_source_1.AppDataSource.query(query));
            return ((_a = sales === null || sales === void 0 ? void 0 : sales.reduce((cur, prev) => {
                return (cur + caculateProductTotal(prev.price, prev.quantity, prev.discount));
            }, 0)) !== null && _a !== void 0 ? _a : 0);
        });
    }
    static salesThisYear() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = rangeQuery(toUnix((0, date_fns_1.startOfYear)(new Date())), toUnix((0, date_fns_1.endOfYear)(new Date())));
            const sales = (yield data_source_1.AppDataSource.query(query));
            return ((_a = sales === null || sales === void 0 ? void 0 : sales.reduce((cur, prev) => {
                return (cur + caculateProductTotal(prev.price, prev.quantity, prev.discount));
            }, 0)) !== null && _a !== void 0 ? _a : 0);
        });
    }
    static salesLastMonth() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const dateLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const query = rangeQuery(toUnix((0, date_fns_1.startOfMonth)(dateLastMonth)), toUnix((0, date_fns_1.endOfMonth)(dateLastMonth)));
            const sales = (yield data_source_1.AppDataSource.query(query));
            const result = (_a = sales === null || sales === void 0 ? void 0 : sales.reduce((cur, prev) => {
                return (cur + caculateProductTotal(prev.price, prev.quantity, prev.discount));
            }, 0)) !== null && _a !== void 0 ? _a : 0;
            return result;
        });
    }
    static lowStockProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const products = yield repo.find();
            return products.filter((product) => {
                return product.stock < product.reorderPoint;
            }).length;
        });
    }
    static expiredProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = Date.now();
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const products = yield repo.find();
            return products.filter((product) => {
                return +product.expiration < today;
            }).length;
        });
    }
}
exports.DashboardService = DashboardService;
