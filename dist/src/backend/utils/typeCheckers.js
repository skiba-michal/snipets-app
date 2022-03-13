"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJwtPayload = void 0;
const isJwtPayload = (value) => {
    return typeof value === "string" ? false : true;
};
exports.isJwtPayload = isJwtPayload;
