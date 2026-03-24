const User = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ mssg: "login" });
};

const signupUser = async (req, res) => {
  res.json({ mssg: "login" });
};

module.exports = { loginUser, signupUser };
