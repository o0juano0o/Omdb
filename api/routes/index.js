const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/favorites", require("./favorites"));
router.use("/movies", require("./movies"));

module.exports = router;
