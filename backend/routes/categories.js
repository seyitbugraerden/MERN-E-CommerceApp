// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();

// Tüm Kategorileri Alalım

router.get("/", async (req, res) => {
  res.send("Kategoriler Getirildi");
});

module.exports = router;
