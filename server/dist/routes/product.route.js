"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const productRoute = (0, express_1.Router)();
productRoute.get('/product/supplier/:id', jwt_middleware_1.JwtMiddleware.verify, product_controller_1.ProductController.getAllBySupplierId);
productRoute.get('/product', jwt_middleware_1.JwtMiddleware.verify, product_controller_1.ProductController.getAll);
productRoute.post('/product', jwt_middleware_1.JwtMiddleware.verify, product_controller_1.ProductController.create);
productRoute.put('/product/:id', jwt_middleware_1.JwtMiddleware.verify, product_controller_1.ProductController.update);
productRoute.delete('/product/:id', jwt_middleware_1.JwtMiddleware.verify, product_controller_1.ProductController.delete);
exports.default = productRoute;
