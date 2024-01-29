const asyncWrapper = require("../middleware/Async");
const bcrypt = require("bcryptjs");
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
//signup
const signUp = asyncWrapper(async (req, res) => {
  const { name, email, profession, location, password } = req.body;

  if (!name || !email || !profession || !password) {
    throw new BadRequestError(
      "name, email, profession, and password are required fields."
    );
  }

  try {
    const existingUser = await Data.findOne({ email });
    if (existingUser) {
      throw new ExistingUserError(
        "Email is already registered. Please sign in."
      );
    }

    const newUser = new Data({
      name,
      email,
      profession,
      location,
      password,
    });
    await newUser.save();
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Sign-up successful",
      token,
      newUser: { name: newUser.name },
    });
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("password and email are required fields.");
  }

  try {
    const existingUser = await Data.findOne({ email });

    if (!existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User not found. Please sign up." });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = existingUser.createJWT();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Sign-in successful",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

const dashboard = asyncWrapper(async (req, res) => {
  console.log("fix-it");
});

module.exports = {
  waitList,
  signIn,
  signUp,
  dashboard,
};
