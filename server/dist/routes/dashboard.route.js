"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const dashboardRoute = (0, express_1.Router)();
dashboardRoute.get('/dashboard', jwt_middleware_1.JwtMiddleware.verify, dashboard_controller_1.DashboardController.get);
exports.default = dashboardRoute;
