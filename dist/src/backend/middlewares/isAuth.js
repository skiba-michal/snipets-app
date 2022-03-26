"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _utils_1 = require("@utils");
const isAuth = (req, res, next) => {
    var _a;
    const authorization = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ");
    if (!authorization || authorization.length < 1) {
        const error = new Error(_utils_1.errorMessages.notAuthenticated);
        error.statusCode = 401;
        throw error;
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
        const error = new Error(_utils_1.errorMessages.notAuthenticated);
        error.statusCode = 401;
        throw error;
    }
    if ((0, _utils_1.isJwtPayload)(decodedToken)) {
        req.userId = decodedToken.userId;
    }
    next();
};
exports.isAuth = isAuth;
