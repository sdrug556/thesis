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
exports.HistoryController = void 0;
const history_service_1 = require("../service/history.service");
class HistoryController {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield history_service_1.HistoryService.getAll());
                next();
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e);
                next();
            }
        });
    }
}
exports.HistoryController = HistoryController;
