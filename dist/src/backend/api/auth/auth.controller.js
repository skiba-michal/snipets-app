"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const _utils_1 = require("@utils");
const auth_model_1 = require("./auth.model");
const login = (req, res, next) => {
    const body = req.body;
    const login = body.login;
    const password = body.password;
    let loadedUser;
    auth_model_1.UserModel.findOne({ login })
        .then(user => {
        if (!user) {
            const error = new Error(_utils_1.errorMessages.userNotFound);
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcryptjs_1.default.compare(password, user.password);
    })
        .then(isEqual => {
        if (!isEqual) {
            const error = new Error(_utils_1.errorMessages.wrongPassword);
            error.statusCode = 401;
            throw error;
        }
        const userId = loadedUser._id ? loadedUser._id.toString() : "";
        const token = jsonwebtoken_1.default.sign({ login: loadedUser.login, userId: userId }, process.env.HASH_KEY, { expiresIn: "2h" });
        const response = {
            message: _utils_1.succesMessages.logedIn,
            data: {
                name: loadedUser.name,
                token: token,
                permissions: loadedUser.permissions,
                id: userId,
            },
        };
        res.status(200).json(response);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.login = login;
const signup = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error(_utils_1.validationMessages.validationFailed);
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const body = req.body;
    const login = body.login;
    const name = body.name;
    const password = body.password;
    bcryptjs_1.default
        .hash(password, 12)
        .then(hashedPassword => {
        const user = new auth_model_1.UserModel({
            login,
            name,
            password: hashedPassword,
        });
        return user.save();
    })
        .then(() => {
        const response = {
            message: _utils_1.succesMessages.userCreated,
        };
        res.status(201).json(response);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.signup = signup;
