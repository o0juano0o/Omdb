const express = require("express");
const { Op } = require("sequelize");
const userRouter = express.Router();
const User = require("../models/UserModel");

userRouter.get("/", (req, res) => {
  const userid = req.query.userId;
  User.findAll({ where: { id: { [Op.ne]: userid } } }).then((users) =>
    res.status(200).send({ users })
  );
});

userRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    return res.status(200).send(user);
  });
});

module.exports = userRouter;
