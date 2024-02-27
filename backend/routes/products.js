// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();

// Tüm Ürünleri Alalım

router.get("/", async (req, res) => {
  res.send("Ürünler Getirildi");
});

//export etmemiz gerekli!
module.exports = router;
