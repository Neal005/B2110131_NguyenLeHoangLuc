require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const MONGO_URL = "mongodb://localhost:27017/bookstore";

// Built-In middleware
app.use(express.json());

// Third-party middleware
app.use(cors({ origin: "*" }));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// router-level middleware
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/accounts", require("./routes/accounts.routes"));

app.listen(3000, () => {
  console.log("Server started!");
});
