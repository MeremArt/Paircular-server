const asyncWrapper = require("../middleware/Async");
const mongoose = require("mongoose");
const Data = require(`../model/waitList`);
const jwt = require(`jsonwebtoken`);
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, ExistingUserError } = require("../error");

const waitList = asyncWrapper(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError("Please provide email and password");
  }

  const newData = new Data({ name, email });

  try {
    await newData.save();
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Data received and stored successfully.",
    });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error." });
  }
});

const bcrypt = require("bcrypt");

const signUp = asyncWrapper(async (req, res) => {
  const { name, email, profession, location, password } = req.body;

  if (!name || !email || !profession || !password) {
    throw new BadRequestError(
      "Name, email, profession, and password are required fields."
    );
  }

  try {
    const existingUser = await Data.findOne({ email });
    if (existingUser) {
      throw new ExistingUserError(
        "Email is already registered. Please sign in."
      );
    }

    // Generate a random salt and hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Data({
      name,
      email,
      profession,
      location,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Sign-up successful",
    });
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Password and email are required fields.");
  }

  try {
    const existingUser = await Data.findOne({ email });

    if (!existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User not found. Please sign up." });
    }

    // Use bcrypt.compare to check if the entered password is correct
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Sign-in successful",
    });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

module.exports = {
  waitList,
  signIn,
  signUp,
};
