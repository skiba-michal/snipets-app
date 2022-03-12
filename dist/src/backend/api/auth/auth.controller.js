"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login = (req, res, next) => {
    const body = req.body;
    const login = body.login;
    const password = body.password;
};
exports.login = login;
