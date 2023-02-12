"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = exports.TABLE_supplier = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_supplier = 'supplier';
let Supplier = class Supplier {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Supplier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Supplier.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Supplier.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true })
], Supplier.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { nullable: true })
], Supplier.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Supplier.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean')
], Supplier.prototype, "isDeleted", void 0);
Supplier = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_supplier })
], Supplier);
exports.Supplier = Supplier;
