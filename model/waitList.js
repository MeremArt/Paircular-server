const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Must provide a firstname."],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Must provide a lastname."],
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
