"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.TABLE_product = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_product = 'product';
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true })
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Product.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { nullable: true })
], Product.prototype, "expiration", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true })
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { nullable: true })
], Product.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Product.prototype, "reorderPoint", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Product.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean')
], Product.prototype, "isDeleted", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_product })
], Product);
exports.Product = Product;
