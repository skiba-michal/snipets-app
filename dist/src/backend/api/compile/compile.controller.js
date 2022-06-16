"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileCode = void 0;
const axios_1 = __importDefault(require("axios"));
const _const_1 = require("@const");
const compileCode = (req, res, next) => {
    const body = req.body;
    const data = {
        code: body.code,
        language: body.language,
        input: body.input,
    };
    const config = {
        method: "post",
        url: _const_1.compileApi,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };
    (0, axios_1.default)(config)
        .then(response => {
        console.log(response);
        res.status(200).json(response.data);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.compileCode = compileCode;
