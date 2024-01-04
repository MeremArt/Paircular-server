const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Must provide an email."],
  },
  profession: {
    type: String,
    required: [true, "Must provide a profession."],
  },
  location: {
    type: String,
    required: [true, "Must provide a location."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
