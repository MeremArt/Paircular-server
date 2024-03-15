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
  availabilityDate: {
    type: Date,
    required: [true, "Must provide the availability date."],
    validate: {
      validator: function (value) {
        // Validate that the availability date is a future date
        return value > new Date();
      },
      message: "Availability date must be a future date.",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
