const express = require("express");
const moviesRouter = express.Router();
const axios = require("axios");
//const models = require("../models");

moviesRouter.get("/:tittle", (req, res) => {
  console.log("hola");
  const tittle = req.params.tittle;
  return axios
    .get(`http://www.omdbapi.com/?apikey=37532b34&t=${tittle}`)
    .then((res) => {
      console.log(res.data);
      res.data;
    });
});

module.exports = moviesRouter;
