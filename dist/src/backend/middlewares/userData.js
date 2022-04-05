"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _models_1 = require("@models");
const express_1 = require("express");
const userData_controller_1 = require("./userData.controller");
const _middlewares_1 = require("@middlewares");
const router = (0, express_1.Router)({ strict: true });
router.get(`/${_models_1.apiStructure.userData.profile}`, _middlewares_1.isAuth, userData_controller_1.getUserProfile);
exports.default = router;
