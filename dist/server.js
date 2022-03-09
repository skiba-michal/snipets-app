"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = __importDefault(require("./src/backend/routes/todos"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join("public")));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});
app.get("/api/about", (_, res) => {
    res.send(JSON.stringify("abouttttttt2"));
});
app.use(todos_1.default);
app.use((_, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "public", "index.html"));
});
// req, res, next
mongoose_1.default
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0unqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(process.env.PORT);
})
    .catch((err) => console.log(err));
