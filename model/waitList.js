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
    unique: true,
  },
  profession: {
    type: String,
    required: [true, "Must provide a profession."],
  },
  password: {
    type: String,
    required: [true, "Must provide a password."],
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
