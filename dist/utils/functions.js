"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullish = exports.getActionParameter = exports.getActionName = void 0;
function getActionName(method) {
    switch (method.toLowerCase()) {
        case 'post':
            return 'create';
        case 'put':
        case 'patch':
            return 'update';
        case 'delete':
            return 'delete';
        default:
            return 'get';
    }
}
exports.getActionName = getActionName;
function getActionParameter(method, id, body) {
    switch (method.toLowerCase()) {
        case 'post':
            return [body];
        case 'put':
        case 'patch':
            return [id, body];
        case 'delete':
            return [id];
        default:
            return [id];
    }
}
exports.getActionParameter = getActionParameter;
function isNullish(value) {
    return value === null || value === undefined;
}
exports.isNullish = isNullish;
