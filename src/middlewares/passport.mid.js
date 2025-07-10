import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from "../dao/manager.mongo.js";
import { compareHash, createHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import errors from "../helpers/errors/errors.js";
import { cartDao } from "../dao/cart.dao.js";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email"
    },
    async (req, email, password, done) => {
      try {
        const one = await usersManager.readBy({ email });
        if (one) {
          return done(null, null, errors.invalid);
        }

        // modificacion para carrito
        const newCart = await cartDao.create();

        //creamos el usuario
        const newUser = {
          name: req.body.name,
          date: req.body.date || new Date(),
          email: req.body.email,
          password: req.body.password = createHash(password),
          avatar: req.body.avatar || "https://cdn-icons-png.flaticon.com/512/266/266033.png",
          role: req.body.role || "USER",
          cart: newCart._id
        }

        const user = await usersManager.createOne(newUser);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readBy({ email });
        if (!user) {
          return done(null, null, errors.invalid);
        }
        const verifyPassword = compareHash(password, user.password);
        if (!verifyPassword) {
          return done(null, null, errors.invalid);
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )

);

export default passport;
