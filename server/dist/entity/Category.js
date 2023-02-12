"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.TABLE_Category = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_Category = 'category';
let Category = class Category {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { nullable: true })
], Category.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int')
], Category.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean')
], Category.prototype, "isDeleted", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_Category })
], Category);
exports.Category = Category;
