"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _models_1 = require("@models");
const express_1 = require("express");
const compile_controller_1 = require("./compile.controller");
const _middlewares_1 = require("@middlewares");
const router = (0, express_1.Router)({ strict: true });
router.post(`/${_models_1.apiStructure.compile.compile}`, _middlewares_1.isAuth, compile_controller_1.compileCode);
exports.default = router;
