const router = require("express").Router();
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Voter = require("../models/voterModel");
const { Web3 } = require("web3");
const providerUrl = "HTTP://127.0.0.1:7545"; // Update this with your actual provider URL
var web3 = new Web3(providerUrl);
const MyContract = require("../../blockchain/build/contracts/Voting.json");
const allouerUnUtilisateur = require("../utils/allowVoter");
const haveVoted = require("../utils/haveVoted");

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    voter = await Voter.findOne({
      nom: req.body.nom,
      prenom: req.body.prenom,
      wilaya: req.body.wilaya,
      genre: req.body.genre,
      anneeNaissance: req.body.anneeNaissance,
      cardId: req.body.cardId,
    });
    if (!voter)
      return res
        .status(409)
        .send({ message: "Verify your Voter informations" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      email: req.body.email,
      password: hashPassword,
      cardId: req.body.cardId,
    }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });
    const account = await web3.eth.accounts.create();
    const accounts = await web3.eth.getAccounts();
    const admin = accounts[0];
    console.log(admin);
    const transactionObject = {
      from: admin,
      to: account.address,
      value: web3.utils.toWei("0.01", "ether"),
      gas: 6721975,
      gasPrice: 20000000000,
    };

    // Sign the transaction
    await web3.eth.accounts
      .signTransaction(transactionObject, process.env.PRIVATE_KEY)
      .then((signedTx) => {
        // Send the signed transaction
        return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      })
      .then((receipt) => {
        console.log("Transaction sent:", receipt.transactionHash);
      })
      .catch((err) => {
        console.error("Error sending transaction:", err);
      });
    const networkId = await web3.eth.net.getId();
    const votingContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address
    );
    const balance = await web3.eth.getBalance(account.address);
    console.log(
      "Solde du compte:",
      web3.utils.fromWei(balance, "ether"),
      "ETH"
    );
    const adressePublic = account.address;
    const encryptedPrivateKey = await web3.eth.accounts.encrypt(
      account.privateKey,
      user.cardId.toString()
    );

    const storingPrivateKey = JSON.stringify(encryptedPrivateKey);
    console.log(storingPrivateKey);

    const txHash = await allouerUnUtilisateur(
      admin,
      process.env.PRIVATE_KEY,
      account.address,
      votingContract
    );
    console.log(user);
    await User.updateOne(
      { _id: user._id },
      {
        verified: true,
        adressePrivee: storingPrivateKey,
        adressePublic: account.address,
      }
    );
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
