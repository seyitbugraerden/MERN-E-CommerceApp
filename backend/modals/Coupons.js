const mongoose = require("mongoose");

const CouponSchmema = mongoose.Schema(
  {
    // Sayfamızdaki Coupon yapısını inceleyerek hangi verilere ihtiyacımız olduğunu kurgulamalıyız.
    code: { type: String, required: true },
    discountPercent: { type: Number, required: true },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchmema);

module.exports = Coupon;
