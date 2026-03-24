require("dotenv").config();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const voteRoutes = require("./routes/vote");

const express = require("express");
const mongoose = require("mongoose");
const voterRoutes = require("./routes/voters");
const cors = require("cors");
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/voters", voterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);
// connect to db
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
