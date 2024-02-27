// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();
// Gelen verileri import edebilmem için sağlayıcı kaynak lazım.
const Category = require("../../backend/modals/Category");

// Tüm Kategorileri Alalım
router.get("/", async (req, res) => {
  res.send("Kategoriler Getirildi");
});

// Yeni bir kategori oluşturalım
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body; // burada req.body bizim frontte gönderdiğimiz kategori veri bilgisi
    const newCategory = new Category({ name, img });
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//export etmemiz gerekli!
module.exports = router;
