"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBase = void 0;
class ControllerBase {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    created(url) {
        this.response.setHeader('Location', url);
        this.response.status(201).end();
    }
    notFound() {
        this.response.status(404).end();
    }
}
exports.ControllerBase = ControllerBase;
