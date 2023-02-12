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
exports.SaleService = void 0;
const data_source_1 = require("../data-source");
const Sales_1 = require("../entity/Sales");
const base_service_1 = require("./base-service");
const Product_1 = require("../entity/Product");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const User_1 = require("../entity/User");
class SaleService extends base_service_1.BaseService {
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT sales.id, sales.price, sales.quantity, sales."invoiceNumber" , sales.discount, sales."createdDate" ,
             product."name" "productName", product.supplier , product.category,
             CONCAT("firstName", ' ', "lastName") name
      FROM "${Sales_1.TABLE_sales}" sales
      inner join "${Product_1.TABLE_product}" product on sales."productId" = product."id"
      inner join "${User_1.TABLE_user}" u on sales."createdBy"  = u.id 
      order by sales.id desc 
    `;
            return yield data_source_1.AppDataSource.query(query);
        });
    }
    static today() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        SELECT sales.id, sales.price, sales.quantity, sales."invoiceNumber" , sales.discount, sales."createdDate" ,
               product."name" "productName", product.supplier , product.category, product.id "productId",
               CONCAT("firstName", ' ', "lastName") name
        FROM "${Sales_1.TABLE_sales}" sales
        inner join "${Product_1.TABLE_product}" product on sales."productId" = product."id"
        inner join "${User_1.TABLE_user}" u on sales."createdBy"  = u.id
        where sales."createdDate" > ${+(0, date_fns_1.startOfToday)()} and sales."createdDate" < ${+(0, date_fns_1.endOfToday)()}
        order by sales.id desc 
      `;
            return yield data_source_1.AppDataSource.query(query);
        });
    }
    static create(userId, sales) {
        return __awaiter(this, void 0, void 0, function* () {
            const salesRepo = data_source_1.AppDataSource.getRepository(Sales_1.Sales);
            const productRepo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const productIds = sales.map(s => s.productId);
            let products = yield productRepo.find({
                where: {
                    id: (0, typeorm_1.In)(productIds)
                }
            });
            sales = sales.map(sale => {
                sale.createdBy = userId;
                sale.createdDate = Date.now();
                return sale;
            });
            products = products.map(product => {
                const sale = sales.find(a => a.productId == product.id);
                if (sale) {
                    product.stock = product.stock - sale.quantity;
                }
                return product;
            });
            yield productRepo.manager.save(products.map(p => productRepo.create(p)));
            yield salesRepo.manager.save(sales.map(s => salesRepo.create(s)));
            return;
        });
    }
    static cancel(userId, cancelInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepo.findOneOrFail({
                where: {
                    email: cancelInfo.email,
                    password: cancelInfo.password,
                }
            });
            if (!user) {
                return false;
            }
            const salesRepo = data_source_1.AppDataSource.getRepository(Sales_1.Sales);
            const productRepo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const sale = yield salesRepo.findOneOrFail({ where: { id: cancelInfo.id } });
            if (sale) {
                sale.quantity = sale.quantity - cancelInfo.cancelQty;
                if (sale.quantity <= 0) {
                    yield salesRepo.manager.remove(sale);
                }
                else {
                    yield salesRepo.manager.save(salesRepo.create(sale));
                }
            }
            if (cancelInfo.addToInventory) {
                const product = yield productRepo.findOneOrFail({
                    where: { id: cancelInfo.productId }
                });
                product.stock = product.stock + cancelInfo.cancelQty;
                yield productRepo.manager.save(productRepo.create(product));
            }
            return true;
        });
    }
}
exports.SaleService = SaleService;
