"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
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
    permissions: {
        type: Array,
        required: true,
    },
});
// Example of ref
// posts: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: 'Posts'
//   }
// ]
