"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    permissions: {
        type: Array,
        default: [],
    },
    settings: {
        showOnlyMyData: {
            type: Boolean,
            default: false,
        },
        showSnippets: {
            type: Boolean,
            default: true,
        },
        showScience: {
            type: Boolean,
            default: true,
        },
        showProjectSnippets: {
            type: Boolean,
            default: true,
        },
        showInterviewQuestions: {
            type: Boolean,
            default: true,
        },
        showLanguages: {
            type: Boolean,
            default: true,
        },
        showCompilators: {
            type: Boolean,
            default: true,
        },
        showGenerators: {
            type: Boolean,
            default: true,
        },
    }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
