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
const messages_1 = require("@utils/messages");
const auth_controller_1 = require("./auth.controller");
const auth_model_1 = require("./auth.model");
const auth_controller_2 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("login", auth_controller_1.login);
router.post("signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage(messages_1.validationMessages.invalidEmail)
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const userDoc = yield auth_model_1.UserModel.findOne({ email: value });
        if (userDoc) {
            return Promise.reject(messages_1.validationMessages.emailExist);
        }
    }))
        .normalizeEmail(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }).withMessage(messages_1.validationMessages.toShortPassword),
    (0, express_validator_1.body)("name").trim().not().isEmpty().withMessage(messages_1.validationMessages.isRequired),
], auth_controller_2.signup);
exports.default = router;
