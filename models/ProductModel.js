const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    coordinate: { type: Array, required: true },
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    availaableQuantity: { type: Number, required: true, },
    price: { type: Number, required: true },
    phoneNumber: { type: Number, },
    status: { type: String, },
    adress: { type: String,},
    image: { type: Array, },
   // moisture: { type: String, required: true, },
    //ph: { type: String, required: true, },
    //description: { type: String, required: true, },
   
    date: { type: Date, default: Date.now },
    
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("ProductModel", ProductSchema);
module.exports = ProductModel;