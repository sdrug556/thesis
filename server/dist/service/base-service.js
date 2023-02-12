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
exports.BaseService = void 0;
const data_source_1 = require("../data-source");
const date_1 = require("../utilities/date");
class BaseService {
    getAll(repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(repoName);
            return yield repo.find();
        });
    }
    create(item, repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(repoName);
            item.createdDate = (0, date_1.dateNowUTC)();
            item.isDeleted = false;
            const newProduct = yield repo.manager.save(item);
            return newProduct.id;
        });
    }
    update(id, product, repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(repoName);
            const productData = yield repo.findOneByOrFail({ id });
            if (!productData) {
                throw new Error('product not found');
            }
            yield repo.manager.save(Object.assign(Object.assign({}, productData), product));
            return true;
        });
    }
    delete(id, repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore-next
            return this.update(id, { isDeleted: true }, repoName);
        });
    }
}
exports.BaseService = BaseService;
