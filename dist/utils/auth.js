"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function auth({ schema: defaultSchema = 'Bearer', secret, }) {
    return (req, res, next) => {
        const unauthorized = () => {
            res.status(401).end();
        };
        const authorization = req.headers.authorization;
        if (authorization) {
            const [schema, token] = authorization.split(" ");
            if (defaultSchema !== schema || token === undefined) {
                unauthorized();
            }
            else {
                try {
                    if ((0, jsonwebtoken_1.verify)(token, secret)) {
                        next();
                    }
                    else {
                        unauthorized();
                    }
                }
                catch (_a) {
                    unauthorized();
                }
            }
        }
        else {
            unauthorized();
        }
    };
}
exports.default = auth;
