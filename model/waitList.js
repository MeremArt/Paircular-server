const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const dataSchema = new mongoose.Schema(
  {
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    location: {
      type: String,
      required: [true, "Must provide a location."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

dataSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
dataSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

dataSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// generate password reset token
dataSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
