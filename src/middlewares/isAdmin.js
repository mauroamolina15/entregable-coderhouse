import { USER_ROLE } from "../constants";
import { HTTP_STATUS } from "../constants/http";
import UserDao from "../persistence/daos/db/user.dao";
import { HttpResponse } from "./httpResponse";
import jwt from "jsonwebtoken";

const userDao = new UserDao();
const http = new HttpResponse();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization;

    if (!authHeader) {
      return http.unauthorized(res, HTTP_STATUS.UNAUTHORIZED.message);
    }

    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);

    if (user.role !== USER_ROLE.ADMIN) {
      return http.unauthorized(res, HTTP_STATUS.UNAUTHORIZED.message);
    }

    next();
  } catch (error) {
    next(error.message);
  }
};