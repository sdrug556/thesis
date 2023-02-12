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
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
class AuthController {
    static login(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) && !((_b = req.body) === null || _b === void 0 ? void 0 : _b.password)) {
                res.status(401);
            }
            else {
                const result = yield auth_service_1.AuthService.login(req.body);
                if (result) {
                    res.send({ token: result });
                }
                else {
                    res.status(401);
                }
            }
            next();
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.AuthService.logout(req.body.createdBy);
            if (result) {
                res.status(200).send('');
            }
            else {
                res.status(401);
            }
            next();
        });
    }
}
exports.AuthController = AuthController;
