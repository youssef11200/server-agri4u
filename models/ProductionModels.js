const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = mongoose.Schema({
  name: { String },
  rating: { Number },
  comment: { String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const productionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Production = mongoose.model("Production", productionSchema);
module.exports = Production;
