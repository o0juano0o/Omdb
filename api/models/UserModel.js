const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    username: {
      type: S.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exist!",
      },
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        isEmail: true,
      },
    },
    gender: {
      type: S.STRING,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

//hooks

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
