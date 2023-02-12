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
exports.ProductService = void 0;
const date_1 = require("../utilities/date");
const data_source_1 = require("../data-source");
const Product_1 = require("../entity/Product");
const base_service_1 = require("./base-service");
class ProductService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.REPO_NAME = 'repoProduct';
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            return yield repo.find({
                order: {
                    id: 'ASC'
                },
                where: {
                    isDeleted: false
                }
            });
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            user.createdDate = (0, date_1.dateNowUTC)();
            user.isDeleted = false;
            const newProduct = yield repo.manager.save(repo.create(user));
            return newProduct.id;
        });
    }
    static update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const productData = yield repo.findOneByOrFail({ id });
            if (!productData) {
                throw new Error('product not found');
            }
            yield repo.manager.save(repo.create(Object.assign(Object.assign({}, productData), product)));
            return true;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            const productData = yield repo.findOneByOrFail({ id });
            if (!productData) {
                throw new Error('product not found');
            }
            yield repo.manager.save(repo.create(Object.assign(Object.assign({}, productData), { isDeleted: true })));
            return true;
        });
    }
    static getAllBySupplierId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Product_1.Product);
            return yield repo.find({
                where: {
                    supplier: id
                }
            });
        });
    }
}
exports.ProductService = ProductService;
