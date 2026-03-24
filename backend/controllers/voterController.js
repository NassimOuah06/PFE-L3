const Voter = require("../models/voterModel");
const mongoose = require("mongoose");
//get all voters
const getVoters = async (req, res) => {
  try {
    const voters = await Voter.find({}).sort({ nom: 1 });
    res.status(200).json(voters);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get single voter by id
const getVoter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "voter not found" });
  }
  const voter = await Voter.findById(id);
  if (!voter) {
    return res.status(404).json({ msg: "voter not found" });
  }
  res.status(200).json(voter);
};

//create new voter
const createVoter = async (req, res) => {
  const { nom, prenom, wilaya, genre, anneeNaissance, cardId } = req.body;
  let emptyFields = [];
  if (!nom) {
    emptyFields.push("nom");
  }
  if (!prenom) {
    emptyFields.push("prenom");
  }
  if (!wilaya) {
    emptyFields.push("wilaya");
  }
  if (!genre) {
    emptyFields.push("genre");
  }
  if (!anneeNaissance) {
    emptyFields.push("anneeNaissance");
  }
  if (!cardId) {
    emptyFields.push("cardId");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ msg: "Please fill in all the fields", emptyFields });
  }
  const existingUser = await Voter.findOne({ cardId });
  if (existingUser) {
    return res.status(400).json({ msg: "voter already exists" });   
  }
  try {
    const newVoter = await Voter.create({
      nom,
      prenom,
      wilaya,
      genre,
      anneeNaissance,
      cardId,
    });
    res.status(200).json(newVoter);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//delete voter
const deleteVoter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "voter not found" });
  }
  const voter = await Voter.findOneAndDelete({ _id: id });
  if (!voter) {
    return res.status(404).json({ msg: "voter not found" });
  }
  res.status(200).json(voter);
};

//update voter
const updateVoter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "voter not found" });
  }
  const voter = await Voter.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!voter) {
    return res.status(404).json({ msg: "voter not found" });
  }
  res.status(200).json(voter);
};

module.exports = { createVoter, getVoter, getVoters, deleteVoter, updateVoter };
