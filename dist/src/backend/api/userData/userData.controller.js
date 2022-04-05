"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const _schemas_1 = require("@schemas");
const _utils_1 = require("@utils");
const getUserProfile = (req, res, _next) => {
    const userId = req.userId;
    _schemas_1.UserModel.findOne({ _id: userId }).then(user => {
        if (!user) {
            const error = new Error(_utils_1.errorMessages.userNotFound);
            error.statusCode = 401;
            throw error;
        }
        const response = {
            message: "",
            data: {
                name: user.name,
                permissions: user.permissions,
                settings: user.settings,
                id: userId,
            },
        };
        res.status(200).json(response);
    });
};
exports.getUserProfile = getUserProfile;
