const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const User = require("../models/UserModel");
//const models = require("../models");

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

authRouter.get("/me", (req, res) => {
  console.log("meeee", req.user);
  res.send(req.user); //no se genera persistencia req.user undefined por deserializeUser sin funcionar.
});

authRouter.post("/register", (req, res) => {
  const { username, email, password, gender } = req.body;
  User.create({ username, email, password, gender })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});

authRouter.post("/logout", (req, res) => {
  req.logOut();
  res.status(200).redirect("/");
});

module.exports = authRouter;
