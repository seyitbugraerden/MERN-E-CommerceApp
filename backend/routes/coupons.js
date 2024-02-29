// Öncelikle express'i sayfamıza çağıralım.
const express = require("express");
// Router kullanmamız için "Router" import etmeliyiz.
const router = express.Router();
// Gelen verileri import edebilmem için sağlayıcı kaynak lazım.
const Coupon = require("../../backend/modals/Coupon");

// Yeni Bir Coupon Oluşturalım
router.post("/",async(req,res)=>{
    try {
        const newCoupon = new Coupon(req.body);
        await newCoupon.save();
        res.status(201).json("Coupon Created")
    } catch (error) {
        res.status(500).json({error : "Server Status"})
    }
})
// Kayıtlı Coupon'ları Görelim
router.get("/",async(req,res)=>{
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons)
    } catch (error) {
        res.status(500).json({error : "Server Status"})
    }
})
// Kayıtlı Tek Bir Coupon Görelim (Coupon Id)
router.get("/:couponId",async(req,res)=>{
    try {
        const coupons = await Coupon.findById(req.params.couponId);
        res.status(200).json(coupons)
    } catch (error) {
        res.status(500).json({error : "Server Status"})
    }
})
// Kayıtlı Tek Bir Coupon Görelim (Coupon Code)
router.get("/code/:couponCode", async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ discountPercent: req.params.couponCode });
        if (!coupon) {
            return res.status(404).json({ error: "Coupon not found" });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Kayıtlı Coupon Silme
router.delete("/:couponId",async(req,res)=>{
    try {
        try {
            const deletedCoupon = await Coupon.findOneAndDelete(res.params.couponId);
            res.status(200).json(deletedCoupon)
        } catch (error) {
            res.status(500).json("ID Invalid")
        }
    } catch (error) {
        res.status(500).json({error : "Server Status"})
    }
})
// Kayıtlı Coupon Güncelleme
router.put("/:couponId",async(req,res)=>{
    try {
       const update = req.body;
       const newCoupon = await Coupon.findByIdAndUpdate(
        req.params.couponId,
        update,
        {news: true}
       );
       res.status(200).json(newCoupon)
    } catch (error) {
        res.status(500).json({error : "Server Status"})
    }
})


//export etmemiz gerekli!
module.exports = router;
