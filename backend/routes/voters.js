const express = require("express");
const router = express.Router();
const Voter = require("../models/voterModel");
const {
  createVoter,
  getVoter,
  getVoters,
  deleteVoter,
  updateVoter,
} = require("../controllers/voterController");

router.get("/", getVoters);

router.get("/:id", getVoter);

router.post("/", createVoter);

router.delete("/:id", deleteVoter);

router.patch("/:id", updateVoter);

module.exports = router;
