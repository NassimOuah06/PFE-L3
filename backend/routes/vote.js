const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const MyContract = require("../../blockchain/build/contracts/Voting.json");
const jwt = require("jsonwebtoken");
const { Web3 } = require("web3");
const Voter = require("../models/voterModel");
const providerUrl = "HTTP://127.0.0.1:7545"; // Update this with your actual provider URL

var web3 = new Web3(providerUrl);

// Middleware to decode JWT token
const decodeToken = (req, res, next) => {
  const token = req.body.data;
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "password");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(400).send({ message: "Invalid token." });
  }
};

router.post("/", decodeToken, async (req, res) => {
  const { candidatId } = req.body;
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(409)
        .send({ message: "Verify your Voter informations" });

    const voter = await Voter.findOne({ cardId: user.cardId });

    if (!voter) return res.status(409).send({ message: "Voter not found" });

    const password = user.cardId.toString();
    const encryptedPrivateKey = JSON.parse(user.adressePrivee);

    const accountObject = await web3.eth.accounts.decrypt(
      encryptedPrivateKey,
      password
    );
    const privateKey = accountObject.privateKey;
    const publicKey = user.adressePublic;

    const ownerAddress = process.env.PUBLIC_KEY;
    const ownerPrivateKey = process.env.PRIVATE_KEY;

    const networkId = await web3.eth.net.getId();
    const votingContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address
    );

    const transactionHash = await voterPourCandidat(
      votingContract,
      BigInt(candidatId),
      publicKey,
      privateKey,
      voter.genre,
      voter.wilaya,
      2024 - voter.anneeNaissance
    );

    console.log("Transaction hash:", transactionHash);

    res.status(200).send({ message: "Success", transactionHash });
  } catch (error) {
    console.error("Error during voting process:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.toString() });
  }
});

async function voterPourCandidat(
  votingContract,
  candidatId,
  publicKey,
  privateKey,
  genre,
  wilaya,
  age
) {
  try {
    web3.eth.accounts.wallet.add(privateKey);

    const tx = votingContract.methods.vote(candidatId, genre, wilaya, age);
    const gas = await tx.estimateGas({ from: publicKey });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(publicKey);

    const txData = {
      from: publicKey,
      to: votingContract.options.address,
      data: data,
      gas,
      gasPrice,
      nonce,
    };

    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Voter candidat Transaction hash: ${receipt.transactionHash}`);
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error during blockchain transaction:", error);
    throw error;
  }
}

module.exports = router;
