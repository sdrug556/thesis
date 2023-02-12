"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateEntity = exports.assign = exports.dateNowUTC = void 0;
function dateNowUTC() {
    return Date.now();
}
exports.dateNowUTC = dateNowUTC;
function assign(target, source) {
    const keys = Object.keys(source);
    keys.forEach(key => target[key] = source[key]);
}
exports.assign = assign;
function populateEntity(entity, source) {
    Object.keys(source).forEach(key => entity[key] = source[key]);
    return entity;
}
exports.populateEntity = populateEntity;
