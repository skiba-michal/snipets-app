import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
import todosRoutes from "./src/backend/routes/todos";
import authRoutes from "@api/auth/auth";
import cors from "cors";
import userDataRoutes from "@api/userData/userData";
import compileRoutes from "@api/compile/compile";
import snipetRoutes from "@api/snipets/snipets";
import { RequestError } from "@models";
import { errorMessages } from "@utils";
import { errorHandler } from "@middlewares";

const app = express();

app.use(helmet());
app.use(cookieParser());

if (process.env.MODE === "dev") {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );
}

app.use(bodyParser.json());
app.use(express.static(path.join("public")));

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", authRoutes);
app.use("/api", userDataRoutes);
app.use("/api", compileRoutes);
app.use("/api", snipetRoutes);

app.use("/api", todosRoutes); // to del

app.all("/api/*", () => {
  const error: RequestError = new Error(errorMessages.notFound);
  error.statusCode = 404;
  throw error;
});

app.use((_, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0unqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(err => console.log(err));
