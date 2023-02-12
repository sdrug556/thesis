"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const authRoute = (0, express_1.Router)();
authRoute.post('/login', auth_controller_1.AuthController.login);
authRoute.get('/logout', jwt_middleware_1.JwtMiddleware.verify, auth_controller_1.AuthController.logout);
exports.default = authRoute;
