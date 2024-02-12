const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Must provide a location."],
  },
  amount: {
    type: Number,
    required: [true, "Must provide a amount."],
  },
  image: {
    type: String,
    required: [true, "Must provide an image."],
  },
  occupants: {
    type: Number,
    required: [true, "Must provide number of occupants."],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
