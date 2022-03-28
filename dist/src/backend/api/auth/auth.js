"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const _utils_1 = require("@utils");
const auth_controller_1 = require("./auth.controller");
const auth_model_1 = require("./auth.model");
const auth_controller_2 = require("./auth.controller");
const router = (0, express_1.Router)({ strict: true });
router.post("/login", (req, res, next) => (0, auth_controller_1.login)(req, res, next));
router.post("/signup", [
    (0, express_validator_1.body)("login")
        .trim()
        .isLength({ min: 3 })
        .withMessage(_utils_1.validationMessages.toShortLogin)
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const userDoc = yield auth_model_1.UserModel.findOne({ login: value });
        if (userDoc) {
            return Promise.reject(_utils_1.validationMessages.loginExist);
        }
    })),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }).withMessage(_utils_1.validationMessages.toShortPassword),
    (0, express_validator_1.body)("name").trim().not().isEmpty().withMessage(_utils_1.validationMessages.isRequired),
    (0, express_validator_1.body)("secretKey").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value !== process.env.SECRET_KEY) {
            return Promise.reject(_utils_1.validationMessages.secretKeyIsInvalid);
        }
    })),
], auth_controller_2.signup);
exports.default = router;
