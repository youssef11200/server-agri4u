const mongoose=require("mongoose")
const { Schema } = mongoose;

const CooperativeSchema = new Schema({
  productName: {type:String,}, 
  productType: {type:String,},
  aviableQuantity: {type:String,},
  price:{type:String,},
  date: { type: Date, default: Date.now },
  meta: { votes: Number, },
},{timestamps:true});
const Cooperative=mongoose.model('Cooperative',CooperativeSchema)
module.exports = Cooperative