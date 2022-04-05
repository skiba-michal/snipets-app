"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = exports.throwNotFound = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("./messages");
const throwNotFound = () => {
    const error = new Error(messages_1.errorMessages.notFound);
    error.statusCode = 404;
    throw error;
};
exports.throwNotFound = throwNotFound;
const createUserTokens = (user, onlyToken = false) => {
    const userId = user._id.toString();
    const token = jsonwebtoken_1.default.sign({ login: user.login, userId }, process.env.HASH_KEY, {
        expiresIn: "30m",
    });
    const refreshToken = onlyToken ? "" : jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_HASH_KEY, { expiresIn: "1y" });
    return { token, refreshToken, userId };
};
exports.createUserTokens = createUserTokens;
