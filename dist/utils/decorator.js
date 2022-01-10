"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpDelete = exports.httpPut = exports.httpPost = exports.httpGet = void 0;
function httpGet() {
    return function (target, propertyKey, descriptor) {
        target.get = target[propertyKey];
    };
}
exports.httpGet = httpGet;
function httpPost() {
    return function (target, propertyKey, descriptor) {
        target.create = target[propertyKey];
    };
}
exports.httpPost = httpPost;
function httpPut() {
    return function (target, propertyKey, descriptor) {
        target.update = target[propertyKey];
    };
}
exports.httpPut = httpPut;
function httpDelete() {
    return function (target, propertyKey, descriptor) {
        target.delete = target[propertyKey];
    };
}
exports.httpDelete = httpDelete;
