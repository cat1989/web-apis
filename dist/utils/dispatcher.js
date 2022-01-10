"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const path_1 = require("path");
const fs_1 = require("fs");
const functions_1 = require("./functions");
function dispatcher({ directory, }) {
    return (req, res) => {
        const notFound = () => {
            res.status(404).end();
        };
        const methodNotAllowed = () => {
            res.status(405).end();
        };
        const { pathname } = (0, url_1.parse)(req.url);
        if (pathname) {
            const [controllerName, id] = pathname.substr(1).split(' ');
            const filepath = (0, path_1.resolve)(directory, `${controllerName}.ts`);
            if ((0, fs_1.existsSync)(filepath)) {
                Promise.resolve().then(() => __importStar(require(filepath))).then((exports) => __awaiter(this, void 0, void 0, function* () {
                    const name = `${controllerName.substr(0, 1).toUpperCase()}${controllerName.substr(1)}Controller`;
                    if (exports[name]) {
                        const method = req.method;
                        const controller = new exports[name](req, res);
                        const actionName = (0, functions_1.getActionName)(method);
                        if (controller[actionName]) {
                            const parameter = (0, functions_1.getActionParameter)(method, id, req.body);
                            const actionResult = yield controller[actionName](...parameter);
                            if (!(0, functions_1.isNullish)(actionResult)) {
                                res.send(actionResult).end();
                            }
                            else {
                                res.end();
                            }
                        }
                        else {
                            methodNotAllowed();
                        }
                    }
                    else {
                        notFound();
                    }
                }));
            }
            else {
                notFound();
            }
        }
        else {
            notFound();
        }
    };
}
exports.default = dispatcher;
