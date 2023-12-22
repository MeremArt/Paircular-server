const asyncWrapper = require("../middleware/Async");
const mongoose = require("mongoose");

// Define the data schema
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create the Data model using the schema
const Data = mongoose.model("Data", dataSchema);

const waitList = asyncWrapper(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "Name and email are required fields." });
  }

  const newData = new Data({ name, email });

  try {
    await newData.save();
    res.json({
      success: true,
      message: "Data received and stored successfully.",
    });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = {
  waitList,
};
