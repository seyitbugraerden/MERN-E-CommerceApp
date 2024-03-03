// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();
const Product = require("../modals/Product");

// Tüm Ürünleri Alalım
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});
// Tekil Ürün Alalım
router.get("/:productId", async (req, res) => {
  try {
    try {
      const product = await Product.findById(req.params.productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("Ürün Bulunamadı");
    }
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});
// Yeni Bir Ürün Ekleyelim
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log("Başarılı");
  } catch (error) {
    res.status(500).json({ error: "Server Status" });
  }
});
// Ürün Güncelleyelim
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Status" });
  }
});

// Ürün Silelim
router.delete("/:productId", async (req, res) => {
  try {
    try {
      await Product.findByIdAndDelete(req.params.productId);
      res.status(200).json("Product Deleted");
    } catch (error) {
      res.status(500).json({ error: "Product ID Invalid" });
    }
  } catch (error) {
    res.status(500).json("Server Status");
  }
});

//export etmemiz gerekli!
module.exports = router;
