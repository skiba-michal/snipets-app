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
exports.SnipetModel = exports.SnipetCategoryModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SnipetCategory = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    html: {
        type: Boolean,
        required: true,
    },
    css: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        userId: {
            type: String,
        },
        userName: {
            type: String,
        },
        date: {
            type: String,
        }
    },
    children: {
        type: Array,
        default: [],
    },
});
exports.SnipetCategoryModel = mongoose_1.default.model("SnipetCategory", SnipetCategory);
const Snipet = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    mainCode: {
        type: String,
        default: '',
    },
    htmlCode: {
        type: String,
        default: '',
    },
    cssCode: {
        type: String,
        default: '',
    },
    createdBy: {
        userId: {
            type: String,
        },
        userName: {
            type: String,
        },
        date: {
            type: String,
        }
    },
    categoryData: {
        id: {
            type: String,
        },
        name: {
            type: String,
        }
    }
});
exports.SnipetModel = mongoose_1.default.model("Snipet", Snipet);
