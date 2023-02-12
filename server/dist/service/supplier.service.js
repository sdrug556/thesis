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
exports.SupplierService = void 0;
const data_source_1 = require("../data-source");
const Supplier_1 = require("../entity/Supplier");
const date_1 = require("../utilities/date");
class SupplierService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Supplier_1.Supplier);
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
    static create(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Supplier_1.TABLE_supplier);
            supplier.createdDate = (0, date_1.dateNowUTC)();
            supplier.isDeleted = false;
            const newSupplier = yield repo.manager.save(repo.create(supplier));
            return newSupplier.id;
        });
    }
    static update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Supplier_1.Supplier);
            const supplierData = yield repo.findOneByOrFail({ id });
            if (!supplierData) {
                throw new Error('product not found');
            }
            yield repo.manager.save(repo.create(Object.assign(Object.assign({}, supplierData), product)));
            return true;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Supplier_1.Supplier);
            const supplierData = yield repo.findOneByOrFail({ id });
            if (!supplierData) {
                throw new Error('product not found');
            }
            yield repo.manager.save(repo.create(Object.assign(Object.assign({}, supplierData), { isDeleted: true })));
            return true;
        });
    }
}
exports.SupplierService = SupplierService;
