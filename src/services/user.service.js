import UserDao from "../daos/db/user.dao.js";

const userDao = new UserDao();

export const registerUser = async (user) => {
  try {
    const response = await userDao.registerUser(user);
    return response;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await userDao.loginUser(user);
    return response;
  } catch (err) {
    throw err;
  }
};
