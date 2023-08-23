import UserDao from "../daos/db/user.dao.js";
import { generateToken } from "../jwt/auth.js";

const userDao = new UserDao();

export const registerUser = async (user) => {
  try {
    const response = await userDao.register(user);
    return response;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await userDao.login(user);
    return response ? generateToken(response) : false;
  } catch (err) {
    throw err;
  }
};
