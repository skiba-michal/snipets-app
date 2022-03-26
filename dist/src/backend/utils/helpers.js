"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwNotFound = void 0;
const messages_1 = require("./messages");
const throwNotFound = () => {
    const error = new Error(messages_1.errorMessages.notFound);
    error.statusCode = 404;
    throw error;
};
exports.throwNotFound = throwNotFound;
