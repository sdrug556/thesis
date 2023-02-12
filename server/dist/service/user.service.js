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
exports.UserService = void 0;
const User_1 = require("../entity/User");
const date_1 = require("../utilities/date");
const data_source_1 = require("../data-source");
class UserService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            return yield repo.find();
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            user.createdDate = (0, date_1.dateNowUTC)();
            user.isDeleted = false;
            user.emailConfirmed = true;
            if (user.allowLogin === undefined || user.allowLogin === null) {
                user.allowLogin = true;
            }
            const newUser = yield repo.manager.save(repo.create(user));
            return newUser.id;
        });
    }
    static update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const userData = yield repo.findOneByOrFail({ id });
            if (!userData) {
                throw new Error('user not found');
            }
            yield repo.manager.save(Object.assign(Object.assign({}, userData), user));
            return true;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { isDeleted: true });
        });
    }
}
exports.UserService = UserService;
