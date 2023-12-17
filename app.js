const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const atlasConnectionUri =
  "mongodb+srv://ugofranklin22:1cL7qzwzebnLZPwG@nodeexpressproject.ctgvhgp.mongodb.net/?retryWrites=true&w=majority";
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
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
