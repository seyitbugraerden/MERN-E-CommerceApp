// import express from "express" yapısı js frameworkler için çalışırken backend node.js kısmında require ile import işlemi sağlıyoruz

// nodemon adında bir npm kaynağı kurularak server'ı yeniden başlatmak yerine her save işlevinde server reload olabilir.

const express = require("express"); // express npm install
const mongoose = require("mongoose"); // mongoose npm install
const dotenv = require("dotenv"); // dotenv npm install
const app = express();
const mainRoute = require("./routes/index");
const logger = require("morgan")
const post = 5000;

dotenv.config(); //dotenv config dosyamızı server'a import etik.

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (error) {
    throw error;
  }
};

// Sayfada çok fazla get - update - post gibi fonksiyon olacağı için bunları tek bir yere yığmak istemiyoruz. Bu yüzden "Routes" klasörü oluşturuyoruz.
// app.get("/", (req, res) => {
//   res.send("Hello Express JS");
// });
// app.get("/api", (req, res) => {
//   res.send("Hello I came from API");
// });
// app.get("/yarra", (req, res) => {
//   res.send("Hello I came from API");
// });

//Herhangi bir api sayfaya ulaştığında json şeklinde geleceği için veriyi parse etmeliyiz. ! middlewares !
app.use(logger("dev")) // morgan kütüphanesini kullandık. Bunun sayesinde terminalde yaptığımız logları görebiliyoruz.
app.use(express.json());

app.use("/api", mainRoute);

app.listen(post, () => {
  connect(); //connect fonsiyonu listen içerisinde yazılıyor.
  console.log("Sunucu Çalışıyor");
});
