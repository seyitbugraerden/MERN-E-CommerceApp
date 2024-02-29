// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();
const Product = require("../modals/Product")

// Tüm Ürünleri Alalım
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error : "Server Status"})
  }
});

// Tekil Ürün Alalım
router.get("/:productId", async (req, res) => {
  try {
    try {
      const product = await Product.findById(req.params.productId);
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json("Ürün Bulunamadı")
    }
    
  } catch (error) {
    res.status(500).json({error : "Server Status"})
  }
});
// Yeni Bir Ürün Ekleyelim
router.post("/",async(req,res)=>{
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct)
    console.log("Başarılı")
  } catch (error) {
    res.status(500).json({error : "Server Status"})
  }
})

//export etmemiz gerekli!
module.exports = router;
