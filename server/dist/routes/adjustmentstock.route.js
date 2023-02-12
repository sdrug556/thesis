"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const adjustmentstock_controller_1 = require("../controllers/adjustmentstock.controller");
const adjustmentstockRoute = (0, express_1.Router)();
adjustmentstockRoute.get('/adjustmentstock', jwt_middleware_1.JwtMiddleware.verify, adjustmentstock_controller_1.AdjustmentStockController.getAll);
adjustmentstockRoute.post('/adjustmentstock', jwt_middleware_1.JwtMiddleware.verify, adjustmentstock_controller_1.AdjustmentStockController.create);
exports.default = adjustmentstockRoute;
