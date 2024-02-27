const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    // Sayfamızdaki category yapısını inceleyerek hangi verilere ihtiyacımız olduğunu kurgulamalıyız.
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
