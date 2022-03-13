"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesMessages = exports.errorMessages = exports.validationMessages = void 0;
exports.validationMessages = Object.freeze({
    invalidEmail: "Email is invalid.",
    emailExist: "Email address already exist.",
    toShortPassword: "The password should be at least six characters long.",
    isRequired: "Value is required.",
    validationFailed: "Validation failed.",
});
exports.errorMessages = Object.freeze({
    userNotFound: "A yser with this email could not be found.",
    wrongPassword: "Wrong password.",
    notAuthenticated: "Not authenticated.",
    invalidToken: "Invalid token",
});
exports.succesMessages = Object.freeze({
    userCreated: "User created!",
});
