import jwt from "jsonwebtoken";
import UserDao from "../../daos/db/user.dao.js";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
  };

  const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: "1h" });

  return token;
};
