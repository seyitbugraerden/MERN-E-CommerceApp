const express = require("express");
const mongoose = require("mongoose");
const app = express();
const post = 5000;

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://seyitbugraerden:ES1WpU0WnYzttZOF@mern-e-commerce.19qswqq.mongodb.net/"
    );
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
