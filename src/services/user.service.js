import { generateToken } from "../config/jwt/auth.js";
import UserDao from "../persistence/daos/db/user.dao.js";
import UserRepository from "../persistence/repository/userRepository.js";

const userDao = new UserDao();
const userRepository = new UserRepository();

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

export const getByIdDTO = async (id) => {
  try {
    console.log({ id });
    const response = await userRepository.getByIdDTO(id);
    console.log({ response });
    return response;
  } catch (err) {
    console.log(err);
  }
};
