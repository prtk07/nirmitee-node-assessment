const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const responseHandler = require("./response");

function DBConnect() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log("error at connection" + e);
    });
}

DBConnect();

const app = express()
  .use(cors())
  .use(bodyparser.json())
  .use(bodyparser.urlencoded({ extended: true }));
let port = process.env.PORT || 8080;

app.get("/", responseHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
