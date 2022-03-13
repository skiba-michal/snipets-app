"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [{ id: "ajdi", text: "to do 12" }];
const router = (0, express_1.Router)();
// isAuth test
router.get("todos", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("todos", (req, res, next) => {
    const body = req.body;
    const newToDo = { id: new Date().toISOString(), text: body.text };
    todos.push(newToDo);
    res.status(201).json({ message: "Added todo", todo: newToDo, todos: todos });
});
router.put("todos/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(t => t.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: "updated" });
    }
    res.status(404).json({ messege: "nima" });
});
router.delete("todo/:todoId", (req, res, next) => {
    todos = todos.filter(t => t.id !== req.params.todoId);
    res.status(200).json({ messege: "Deleted to do" });
});
exports.default = router;
