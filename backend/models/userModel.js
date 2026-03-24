const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const JWT_SECRET = "password";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cardId: { type: Number, required: true, unique: true },
    adressePublic: { type: String, default: "" },
    adressePrivee: { type: String, default: "" }, // Champ encrypté
    confirmation_token: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
