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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const app_1 = __importDefault(require("./app"));
const app_config_1 = require("./app.config");
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
function addAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.find({
            where: { email: 'admin@gmail.com' },
            take: 1,
        });
        if (!(user === null || user === void 0 ? void 0 : user.length)) {
            const admin = userRepo.create({
                address: 'pampanga',
                allowLogin: true,
                birthday: Date.now(),
                createdDate: Date.now(),
                email: 'admin@gmail.com',
                emailConfirmed: true,
                firstName: 'admin',
                lastName: 'hyperdrug',
                phone: '123456789',
                password: 'admin',
                isDeleted: false,
                type: 1,
            });
            yield userRepo.manager.save(admin);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const initializeDatabase = () => {
        data_source_1.AppDataSource.initialize()
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log('my successfully initialize database connection');
            // await addAdminUser();
            app_1.default.listen(app_config_1.config.port, () => {
                console.log(`server is running on port ${app_config_1.config.port}`);
            });
        }))
            .catch((error) => console.log('my error: ', error));
    };
    // const result = await checkDatabase({
    //   dataSource: AppDataSource,
    // })
    // console.log('my result: ', result);
    // if (result.exists) {
    //   return initializeDatabase();
    // }
    (0, typeorm_extension_1.createPostgresDatabase)({
        ifNotExist: true,
        initialDatabase: 'postgres',
        options: Object.assign(Object.assign({}, app_config_1.config.database), { type: 'postgres' }),
    })
        .then(() => {
        console.log('my database successfully initialized!');
        initializeDatabase();
    })
        .catch((err) => {
        console.log('my create database error: ', err);
    });
}))();
