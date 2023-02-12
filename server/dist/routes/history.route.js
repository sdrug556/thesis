"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("../controllers/history.controller");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const historyRoute = (0, express_1.Router)();
historyRoute.get('/history/login', jwt_middleware_1.JwtMiddleware.verify, history_controller_1.HistoryController.getAll);
exports.default = historyRoute;
