import { Router } from "express";
import { ToDo } from "../models/todo";
import { isAuth } from "../middlewares/isAuth";

let todos: ToDo[] = [{ id: "ajdi", text: "to do 12" }];

const router = Router();
// isAuth test
router.get("/todos", isAuth, (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("todos", (req, res, next) => {
  const body = req.body as { text: string };

  const newToDo: ToDo = { id: new Date().toISOString(), text: body.text };
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

export default router;
