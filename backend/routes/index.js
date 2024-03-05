// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();

// Route dosyalarını buraya import edelim.
const productRoute = require("./products");
const categoryRoute = require("./categories");
const authRoute = require("./auth");
const couponRoute = require("./coupons");

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);

//export etmemiz gerekli!
module.exports = router;
