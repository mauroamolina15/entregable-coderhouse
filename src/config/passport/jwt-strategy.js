import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserDao from "../../persistence/daos/db/user.dao.js";
import "dotenv/config";

const userDao = new UserDao();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const verifyToken = async (jwt_payload, done) => {
  const user = await userDao.getById(jwt_payload.userId);
  if (!user) return done(null, false);
  return done(null, user);
};

const cookieExtractor = (req) => req.cookies.token;

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: PRIVATE_KEY,
};

passport.use("current", new jwtStrategy(strategyOptionsCookies, verifyToken));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});
