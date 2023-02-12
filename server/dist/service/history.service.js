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
exports.HistoryService = void 0;
const date_1 = require("../utilities/date");
const data_source_1 = require("../data-source");
const History_1 = require("../entity/History");
const User_1 = require("../entity/User");
class HistoryService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT
        ru."id" AS id,
        ru."firstName" AS "firstName",
        ru."lastName" AS "lastName",
        rh."action" ,
        rh."createdDate" from "${History_1.TABLE_History}" rh 
        INNER JOIN "${User_1.TABLE_user}" ru ON rh."userId" = ru."id"
    `;
            const histories = yield data_source_1.AppDataSource.query(query);
            return histories.map((history) => {
                history.fullName = history.firstName + ' ' + history.lastName;
                return history;
            });
        });
    }
    static add(userId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(History_1.History);
            const history = repo.create({
                userId,
                action,
                createdDate: (0, date_1.dateNowUTC)()
            });
            yield repo.manager.save(history);
            return true;
        });
    }
}
exports.HistoryService = HistoryService;
