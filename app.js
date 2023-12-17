const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas using environment variable
const atlasConnectionUri = process.env.MONGO_URL;

mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Data = mongoose.model("Data", dataSchema);

app.post("/api/v1/submit", async (req, res) => {
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

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
