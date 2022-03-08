const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

app.use(express.static(path.join("public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/about", function (req, res) {
  res.send(JSON.stringify("abouttttt"));
});


app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})




mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0unqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("poszlo");
    });
  })
  .catch((err) => console.log(err));
