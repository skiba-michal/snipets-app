"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserSettings = exports.getUserProfile = void 0;
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
const editUserSettings = (req, res, next) => {
    const body = req.body;
    const checkedBody = {
        showOnlyMyData: typeof body.showOnlyMyData === "boolean" ? body.showOnlyMyData : false,
        showSnippets: typeof body.showSnippets === "boolean" ? body.showSnippets : true,
        showScience: typeof body.showScience === "boolean" ? body.showScience : true,
        showProjectSnippets: typeof body.showProjectSnippets === "boolean" ? body.showProjectSnippets : true,
        showInterviewQuestions: typeof body.showInterviewQuestions === "boolean" ? body.showInterviewQuestions : true,
        showLanguages: typeof body.showLanguages === "boolean" ? body.showLanguages : true,
        showCompilators: typeof body.showCompilators === "boolean" ? body.showCompilators : true,
        showGenerators: typeof body.showGenerators === "boolean" ? body.showGenerators : true,
    };
    const userId = req.userId;
    _schemas_1.UserModel.updateOne({ _id: userId }, {
        $set: {
            settings: checkedBody,
        },
    })
        .then(() => {
        const response = {
            message: _utils_1.succesMessages.changesSaved,
            data: checkedBody,
        };
        res.status(200).json(response);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 404;
        }
        err.message = _utils_1.errorMessages.userNotFound;
        next(err);
    });
};
exports.editUserSettings = editUserSettings;
