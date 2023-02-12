"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const app_config_1 = require("./app.config");
const Category_1 = require("./entity/Category");
const Invoice_1 = require("./entity/Invoice");
const Product_1 = require("./entity/Product");
const Supplier_1 = require("./entity/Supplier");
const adjustmentstock_1 = require("./entity/adjustmentstock");
const History_1 = require("./entity/History");
const Sales_1 = require("./entity/Sales");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: app_config_1.config.database.host,
    port: app_config_1.config.database.port,
    username: app_config_1.config.database.username,
    password: app_config_1.config.database.password,
    database: app_config_1.config.database.database,
    synchronize: true,
    logging: false,
    entities: [
        User_1.User,
        Category_1.Category,
        Invoice_1.Invoice,
        Product_1.Product,
        Supplier_1.Supplier,
        adjustmentstock_1.AdjustmentStock,
        History_1.History,
        Sales_1.Sales,
    ],
    migrations: ['./migration/1676078473069-initial.ts'],
    subscribers: [],
});
