import { Router } from "express";
import { ToDo } from "../Models/todo";

let todos: ToDo[] = [{ id: "ajdi", text: "to do 1" }];

const router = Router();

router.get("/api/todos", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/api/todos", (req, res, next) => {
  const body = req.body as { text: string };

  const newToDo: ToDo = { id: new Date().toISOString(), text: body.text };
  todos.push(newToDo);

  res.status(201).json({ message: "Added todo", todo: newToDo, todos: todos });
});

router.put("/api/todos/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((t) => t.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: "updated" });
  }
  res.status(404).json({ messege: "nima" });
});

router.delete("api/todo/:todoId", (req, res, next) => {
  todos = todos.filter((t) => t.id !== req.params.todoId);
  res.status(200).json({ messege: "Deleted to do" });
});

export default router;
