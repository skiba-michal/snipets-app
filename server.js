const express = require("express");
const mongoose = require("mongoose");
const app = express();
console.log("try");

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/about", function (req, res) {
  console.log("eloooo");
  res.send("about");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect("mongodb+srv://user:user@cluster0.0unqv.mongodb.net/snipet?retryWrites=true&w=majority")
  .then((res) => {
    app.listen(8080, () => {
      console.log("poszlo");
    });
  })
  .catch((err) => console.log(err));
