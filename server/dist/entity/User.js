"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.TABLE_user = void 0;
const typeorm_1 = require("typeorm");
exports.TABLE_user = 'user';
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false })
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false })
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean')
], User.prototype, "emailConfirmed", void 0);
__decorate([
    (0, typeorm_1.Column)('text')
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint')
], User.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true })
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean')
], User.prototype, "allowLogin", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean')
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint')
], User.prototype, "createdDate", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: exports.TABLE_user })
], User);
exports.User = User;
