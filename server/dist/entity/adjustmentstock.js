"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdjustmentStock = exports.TABLE_AdjustmentStock = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_AdjustmentStock = 'adjustment-stock';
let AdjustmentStock = class AdjustmentStock {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], AdjustmentStock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], AdjustmentStock.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { nullable: true })
], AdjustmentStock.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], AdjustmentStock.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], AdjustmentStock.prototype, "userId", void 0);
AdjustmentStock = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_AdjustmentStock })
], AdjustmentStock);
exports.AdjustmentStock = AdjustmentStock;
