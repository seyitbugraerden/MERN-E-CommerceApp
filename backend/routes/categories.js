// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();
// Gelen verileri import edebilmem için sağlayıcı kaynak lazım.
const Category = require("../../backend/modals/Category");

// Tüm Kategorileri Alalım( Read - All)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(); // buradaki "find" Category'deki özellikleri getirir.
    res.status(200).json(categories); // Kullanıcı arayüzüne categories'i gönder.
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // server status hatalarını internete araştırabilirsin.
  }
});
// Tekli Kategorileri Alalım ( Read - Single)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId; // params ile HTTP adresine body ile içeriğe erişiyoruz.
    try {
      //if yerine try catch tercih ettik.
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: "Category Not Found!" });
    }
    // if(!category){ if algoritması uygun değil. try catch içinde try catch kullanmak daha yararlı olacak.
    //   return res.status(400).json({error : "Category Not Found!"})
    // }
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

// Yeni bir kategori oluştura lım
router.post("/", async (req, res) => {
  // post ederken console'a undefined hatası düşerse
  try {
    const { name, img } = req.body; // req kullanıcının panelden veya sayfa üzerinden server'a gönderdiği yapı.
    const newCategory = new Category({ name, img }); //schema kullanıldı.
    await newCategory.save();
    res.status(200).json(newCategory); // res olmadan sadece req çalıştırılırsa verimli olmaz. Ve res olması gereklidir. Json = JS dönüşüm yapılmalı. Middleware kullanımı gereklidir.
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Yazılmış bir kategoriyi güncelleyelim
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );
    res.status(500).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Status" });
  }
});
// Yazılmış bir kategoriyi silelim
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findOneAndDelete(categoryId); // derste findIdAndDelete yazıyor.
    if (!deletedCategory) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});

//export etmemiz gerekli!
module.exports = router;
