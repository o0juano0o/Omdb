const express = require("express");
const favouriteRouter = express.Router();
const Favorites = require("../models/Favorites");

favouriteRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Favorites.findAll({ where: { userId: id } })
    .then((fav) => {
      res.status(200).send(fav);
    })
    .catch((err) => {
      console.log(err);
    });
});

favouriteRouter.post("/", (req, res) => {
  const { favoriteId, title, userId } = req.query;
  Favorites.create({ favoriteId, title, userId })
    .then((fav) => {
      res.status(201).send(fav);
    })
    .catch((err) => {
      return console.log(err);
    });
});

favouriteRouter.delete("/", (req, res) => {
  const { userId, favoriteId } = req.query;
  Favorites.destroy({
    where: {
      userId: userId,
      favoriteId: favoriteId,
    },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = favouriteRouter;
