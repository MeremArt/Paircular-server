const asyncWrapper = require("../middleware/Async");
const mongoose = require("mongoose");
const Data = require(`../model/waitList`);

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

const signUp = asyncWrapper(async (req, res) => {
  const { name, email, profession, location, password } = req.body;

  if (!name || !email || !profession) {
    return res.status(400).json({ error: `Name and email are required` });
  }

  try {
    const existingUser = await Data.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: `Email is already registered.Please sign in ` });
    }

    const newUser = new Data({ name, email, profession, location, password });
    await newUser.save();

    res.json({
      success: true,
      message: `Sign-up successful`,
    });
  } catch (error) {
    console.error(`Error during sign-up:`, error.message);
    res.status(500).json({ error: `Internal server error` });
  }
});

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: `Password and email are required` });
  }
  try {
    const existingUser = await Data.findOne({ email, password });

    if (!existingUser) {
      return res.status(404).json({ error: `user not found.Please sign up ` });
    }
    res.json({
      success: true,
      message: `Sign-in successful`,
    });
  } catch (error) {
    console.error(`Error during sign-in`, error.message);
    res.status(500).json({ error: `Internal server error` });
  }
});

module.exports = {
  waitList,
  signIn,
  signUp,
};
