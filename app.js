const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());  //pachi specific domain bata matra request accept garna

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
