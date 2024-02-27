// import express from "express" yapısı js frameworkler için çalışırken backend node.js kısmında require ile import işlemi sağlıyoruz

// nodemon adında bir npm kaynağı kurularak server'ı yeniden başlatmak yerine her save işlevinde server reload olabilir.

const express = require("express"); // express npm install
const mongoose = require("mongoose"); // mongoose npm install
const dotenv = require("dotenv"); // dotenv npm install
const app = express();
const post = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URl);
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
app.get("/yarra", (req, res) => {
  res.send("Hello I came from API");
});

app.listen(post, () => {
  connect(); //connect fonsiyonu listen içerisinde yazılıyor.
  console.log("Sunucu Çalışıyor");
});
