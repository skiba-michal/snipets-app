import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import todosRoutes from "./src/backend/routes/todos";
import authRoutes from "@api/auth/auth";
import { errorHandler } from "@middlewares/index";

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join("public")));

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

app.get("/api/about", (_, res) => {
  res.send(JSON.stringify("abouttttttt2"));
});

app.use(todosRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.use((_, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
// req, res, next
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0unqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(err => console.log(err));
