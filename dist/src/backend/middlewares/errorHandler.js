"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _req, res, _next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data || '';
    res.status(status).json({ message, data });
};
exports.errorHandler = errorHandler;
