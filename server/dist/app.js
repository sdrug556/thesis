"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const app_config_1 = require("./app.config");
const cors_middleware_1 = require("./middleware/cors.middleware");
const adjustmentstock_route_1 = __importDefault(require("./routes/adjustmentstock.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const history_route_1 = __importDefault(require("./routes/history.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const sales_route_1 = __importDefault(require("./routes/sales.route"));
const supplier_route_1 = __importDefault(require("./routes/supplier.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
app.use(cors_middleware_1.CorsMiddleware.cors());
app.use(express_1.default.json());
const defaultRoute = (0, express_1.Router)().get('/', (req, res, next) => {
    res
        .status(200)
        .send(`App running in port: ${app_config_1.config.port}`);
    next();
});
app.use(defaultRoute);
app.use(auth_route_1.default);
app.use(user_route_1.default);
app.use(product_route_1.default);
app.use(supplier_route_1.default);
app.use(category_route_1.default);
app.use(adjustmentstock_route_1.default);
app.use(history_route_1.default);
app.use(sales_route_1.default);
app.use(dashboard_route_1.default);
exports.default = app;
