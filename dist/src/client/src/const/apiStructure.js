"use strict";
// Shared between client and backend
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiStructure = void 0;
exports.apiStructure = {
    auth: {
        login: "auth/login",
        signup: "auth/signup",
        refreshToken: "auth/refreshToken",
        logout: "auth/logout",
    },
    userData: {
        profile: "userData/profile",
        settings: "userData/settings",
    },
    compile: {
        compile: "compile/compileCode",
    },
    snipets: {
        snipetsDetails: "snipets",
        snipetsCategories: "snipets/categories",
    },
};
