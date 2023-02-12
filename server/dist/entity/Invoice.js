"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = exports.TABLE_invoice = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_invoice = 'invoice';
let Invoice = class Invoice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Invoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Invoice.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Invoice.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Invoice.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Invoice.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Invoice.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Invoice.prototype, "createdBy", void 0);
Invoice = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_invoice })
], Invoice);
exports.Invoice = Invoice;
