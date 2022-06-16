"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateString = exports.createUserTokens = exports.throwNotFound = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("./messages");
const _const_1 = require("@const");
const throwNotFound = () => {
    const error = new Error(messages_1.errorMessages.notFound);
    error.statusCode = 404;
    throw error;
};
exports.throwNotFound = throwNotFound;
const createUserTokens = (user, onlyToken = false) => {
    const userId = user._id.toString();
    const token = jsonwebtoken_1.default.sign({ login: user.login, userId, userName: user.name }, process.env.HASH_KEY, {
        expiresIn: "2h",
    });
    const refreshToken = onlyToken ? "" : jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_HASH_KEY, { expiresIn: "1y" });
    return { token, refreshToken, userId };
};
exports.createUserTokens = createUserTokens;
const validateString = (value, options) => {
    if (!value) {
        return false;
    }
    const length = value.length;
    if (options.maxLenght && length > options.maxLenght) {
        return false;
    }
    if (options.minLenght && length < options.minLenght) {
        return false;
    }
    if (options.basicCharactersOnly && !value.match(_const_1.testIsBasicCharacters)) {
        return false;
    }
    return true;
};
exports.validateString = validateString;
