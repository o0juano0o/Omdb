const User = require("./UserModel");
const Favorites = require("./Favorites");

Favorites.belongsTo(User, { as: "user" });

module.exports = { User, Favorites };
