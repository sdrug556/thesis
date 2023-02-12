"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = exports.TABLE_sales = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_sales = 'sales';
let Sales = class Sales {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Sales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Sales.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Sales.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Sales.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint')
], Sales.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Sales.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint')
], Sales.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Sales.prototype, "createdBy", void 0);
Sales = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_sales })
], Sales);
exports.Sales = Sales;
