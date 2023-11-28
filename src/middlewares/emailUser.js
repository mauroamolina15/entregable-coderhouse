import UserDao from "../persistence/daos/db/user.dao";
import jwt from "jsonwebtoken";

const userDao = new UserDao();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const emailUser = async (req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization;

    if (!authHeader) {
      return null;
    }

    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);

    return user.email;

    next();
  } catch (error) {
    next(error.message);
  }
};
