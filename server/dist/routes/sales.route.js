"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_controller_1 = require("../controllers/sales.controller");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const saleRoute = (0, express_1.Router)();
saleRoute.get('/sale/today', jwt_middleware_1.JwtMiddleware.verify, sales_controller_1.SaleController.today);
saleRoute.get('/sale', jwt_middleware_1.JwtMiddleware.verify, sales_controller_1.SaleController.get);
saleRoute.post('/sale/cancel', jwt_middleware_1.JwtMiddleware.verify, sales_controller_1.SaleController.cancel);
saleRoute.post('/sale', jwt_middleware_1.JwtMiddleware.verify, sales_controller_1.SaleController.create);
exports.default = saleRoute;
