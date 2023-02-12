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
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_config_1 = require("../app.config");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const history_service_1 = require("./history.service");
class AuthService {
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(User_1.TABLE_user);
            const user = yield repo.findOneBy({ email: data.email, password: data.password });
            if (!user) {
                return null;
            }
            yield history_service_1.HistoryService.add(user.id, 'Login');
            return (0, jsonwebtoken_1.sign)({ user }, app_config_1.config.jwtSecretKey);
        });
    }
    static logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield history_service_1.HistoryService.add(userId, 'Logout');
            return true;
        });
    }
}
exports.AuthService = AuthService;
