"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const _utils_1 = require("@utils");
const _schemas_1 = require("@schemas");
const login = (req, res, next) => {
    const body = req.body;
    const login = body.login;
    const password = body.password;
    let loadedUser;
    _schemas_1.UserModel.findOne({ login })
        .then(user => {
        if (!user) {
            const error = new Error(_utils_1.errorMessages.badLoginData);
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return { isEqual: bcryptjs_1.default.compare(password, user.password), user };
    })
        .then(data => {
        const { isEqual, user } = data;
        if (!isEqual) {
            const error = new Error(_utils_1.errorMessages.badLoginData);
            error.statusCode = 401;
            throw error;
        }
        const { token, refreshToken, userId } = (0, _utils_1.createUserTokens)(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3.154e10, // 1 year
        });
        _schemas_1.UserModel.updateOne({ _id: userId }, {
            $set: {
                refreshToken: refreshToken,
            },
        })
            .then(() => {
            const response = {
                message: _utils_1.succesMessages.logedIn,
                data: {
                    name: loadedUser.name,
                    token: token,
                    permissions: loadedUser.permissions,
                    settings: loadedUser.settings,
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
        error.data = Object.assign(Object.assign({}, error.data), { errors: errors.array() });
        throw error;
    }
    const body = req.body;
    const login = body.login;
    const name = body.name;
    const password = body.password;
    bcryptjs_1.default
        .hash(password, 12)
        .then(hashedPassword => {
        const user = new _schemas_1.UserModel({
            login,
            name,
            password: hashedPassword,
        });
        return user.save();
    })
        .then(() => {
        const response = {
            message: _utils_1.succesMessages.userCreated,
            data: null,
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
const refreshToken = (req, res, next) => {
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;
    if (!refreshToken) {
        const error = new Error(_utils_1.errorMessages.notAuthenticated);
        error.statusCode = 401;
        throw error;
    }
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_HASH_KEY);
    }
    catch (err) {
        if (err.message === "jwt expired") {
            err.message = _utils_1.errorMessages.tokenExpired;
            err.data = {
                isRefreshTokenExpired: true,
            };
        }
        err.statusCode = 500;
        throw err;
    }
    _schemas_1.UserModel.findOne({ refreshToken })
        .then(user => {
        if (!user) {
            const error = new Error(_utils_1.errorMessages.notAuthenticated);
            error.statusCode = 401;
            throw error;
        }
        const { token } = (0, _utils_1.createUserTokens)(user, true);
        const response = {
            message: "",
            data: {
                token: token,
            },
        };
        res.status(200).json(response);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 403;
        }
        err.message = _utils_1.errorMessages.tokenExpired;
        next(err);
    });
};
exports.refreshToken = refreshToken;
const logout = (req, res, next) => {
    const userId = req.userId;
    _schemas_1.UserModel.findOne({ _id: userId }).then(user => {
        if (!user) {
            const error = new Error(_utils_1.errorMessages.userNotFound);
            error.statusCode = 401;
            throw error;
        }
        _schemas_1.UserModel.updateOne({ _id: userId }, {
            $set: {
                refreshToken: "",
            },
        });
        const response = {
            message: _utils_1.succesMessages.logedOut,
            data: null,
        };
        res.status(200).json(response);
    });
};
exports.logout = logout;
