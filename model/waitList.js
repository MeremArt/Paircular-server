const mongoose = require(`mongoose`);

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, `email price must be provided`],
  },
  profession: {
    type: String,
    required: [true, "must provide profession"],
  },
  location: {
    type: String,
    required: [true, "must provide location"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Data", dataSchema);
