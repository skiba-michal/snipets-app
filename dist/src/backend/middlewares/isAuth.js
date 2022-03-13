"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("@utils/messages");
const typeCheckers_1 = require("@utils/typeCheckers");
const isAuth = (req, res, next) => {
    const authorization = req.get("Authorization").split(" ");
    if (authorization.length < 1) {
        throw new Error(messages_1.errorMessages.invalidToken);
    }
    const token = authorization[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.HASH_KEY);
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error(messages_1.errorMessages.notAuthenticated);
        error.statusCode = 401;
        throw error;
    }
    if ((0, typeCheckers_1.isJwtPayload)(decodedToken)) {
        req.userId = decodedToken.userId;
    }
    next();
};
exports.isAuth = isAuth;
