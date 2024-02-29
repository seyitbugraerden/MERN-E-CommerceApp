const mongoose = require("mongoose");
const ReviewSchema = mongoose.Schema({
  text : {type : String,required:true},
  rating : {type : Number, required:true},
  user :{type : mongoose.Schema.Types.ObjectId, ref : "User",required:true} // Kullanıcıya ait "id" değerine erişebiliyoruz.
})

const ProductSchema = mongoose.Schema(
  {
    // Sayfamızdaki Product Details yapısını inceleyerek hangi verilere ihtiyacımız olduğunu kurgulamalıyız.
    name: { type: String, required: true },
    img: [{ type: String, required: true }], // Array olmasının sebebi bu alana birden fazla yerleşecek olması.
    reviews : [ReviewSchema],
    description : {type:String, required:true},
    colors : [{type:String,required:true}],
    sizes : [{type:String,required:true}],
    price : {current:{type:Number,required:true},discount:{type:Number}},
    category : {type : mongoose.Schema.Types.ObjectId,ref : "Category",required:true}
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
