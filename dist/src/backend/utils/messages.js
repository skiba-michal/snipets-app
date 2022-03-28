"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesMessages = exports.errorMessages = exports.validationMessages = void 0;
exports.validationMessages = Object.freeze({
    loginExist: "Login already exist",
    toShortPassword: "The password should be at least six characters long",
    toShortLogin: "The login should be at least six characters long",
    isRequired: "Value is required",
    validationFailed: "Validation failed",
    secretKeyIsInvalid: "Wrong secret key",
});
exports.errorMessages = Object.freeze({
    userNotFound: "A yser with this email could not be found",
    wrongPassword: "Wrong password",
    notAuthenticated: "Not authenticated",
    notFound: "Not found"
});
exports.succesMessages = Object.freeze({
    userCreated: "User created!",
    logedIn: "You are loged in!",
});
