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
exports.CategoryService = void 0;
const data_source_1 = require("../data-source");
const Category_1 = require("../entity/Category");
const date_1 = require("../utilities/date");
const base_service_1 = require("./base-service");
class CategoryService extends base_service_1.BaseService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            return yield repo.find({
                order: { id: 'ASC' },
                where: {
                    isDeleted: false
                }
            });
        });
    }
    static create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            const cat = repo.create(Object.assign(Object.assign({}, category), {
                createdDate: (0, date_1.dateNowUTC)(),
                isDeleted: false
            }));
            const newCategory = yield repo.manager.save(cat);
            // @ts-ignore-next
            return newCategory.id;
        });
    }
    static update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            const categoryData = yield repo.findOneByOrFail({ id });
            if (!categoryData) {
                throw new Error('product not found');
            }
            yield repo.manager.save(repo.create(Object.assign(Object.assign({}, categoryData), product)));
            return true;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            return this.update(id, repo.create({ isDeleted: true }));
        });
    }
}
exports.CategoryService = CategoryService;
