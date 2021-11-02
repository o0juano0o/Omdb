// server configs
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");
const { User } = require("../api/models");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");

app.use(helmet());

//RUTAS
const routes = require("./routes");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: "Omdb", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api", routes);

passport.use(
  new localStrategy(
    { usernameField: "username", passwordField: "password" },
    function (username, password, done) {
      User.findOne({ where: { username } })
        .then((user) => {
          if (!user) {
            // username not found
            return done(null, false, { message: "Incorrect credentials." });
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false, { message: "Incorrect credentials." }); // wrong password
            }

            return done(null, user, { message: "Loggin success!" }); // success :D
          });
        })
        .catch(done); // done(err)
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // por alguna razon nunca se activa y por eso no genero persistencia, lei en foros muchos problemas sobre esto...
  console.log("des", id);
  User.findByPk(id).then((user) => done(null, user));
});

const PORT = process.env.PORT || 3001; // vale la pena un dotEnv?

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
});
