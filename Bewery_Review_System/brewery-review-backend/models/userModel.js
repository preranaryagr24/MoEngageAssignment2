const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide valid Email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  refreshToken: {
    type: String,
  },
});

userSchema.methods.comparePasswords = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
