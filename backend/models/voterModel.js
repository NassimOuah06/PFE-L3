const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voterSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    wilaya: { type: Number, required: true },
    genre: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    anneeNaissance: { type: Number, required: true },
    cardId: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voter", voterSchema);
