const router = require("express").Router();
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

const haveVoted = require("../utils/haveVoted");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      console.log(token);
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const voted = await haveVoted(user.adressePublic);
    console.log("aaaaa" + voted);

    const token = user.generateAuthToken();
    console.log(token);

    res
      .status(200)
      .send({ data: token, voted, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
