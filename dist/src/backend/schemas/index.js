"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnipetModel = exports.SnipetCategoryModel = exports.UserModel = void 0;
var userSchema_1 = require("./userSchema");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return userSchema_1.UserModel; } });
var snipetsSchema_1 = require("./snipetsSchema");
Object.defineProperty(exports, "SnipetCategoryModel", { enumerable: true, get: function () { return snipetsSchema_1.SnipetCategoryModel; } });
Object.defineProperty(exports, "SnipetModel", { enumerable: true, get: function () { return snipetsSchema_1.SnipetModel; } });
