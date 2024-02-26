const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const post = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => {
  res.send("Hello Express JS");
});
app.get("/api", (req, res) => {
  res.send("Hello I came from API");
});

app.listen(post, () => {
  connect();
  console.log("Sunucu Çalışıyor");
});
