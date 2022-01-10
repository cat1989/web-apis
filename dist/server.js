"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApiServer = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dispatcher_1 = __importDefault(require("./utils/dispatcher"));
class WebApiServer {
    constructor(port) {
        this.rootDirectory = './controllers';
        this.app = (0, express_1.default)();
        this.port = port;
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({
            extended: false
        }));
    }
    use(middleware) {
        this.app.use(middleware);
    }
    run() {
        this.app.use((0, dispatcher_1.default)({
            directory: this.rootDirectory,
        }));
        this.app.listen(this.port);
    }
}
exports.WebApiServer = WebApiServer;
