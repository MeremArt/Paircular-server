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
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
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
