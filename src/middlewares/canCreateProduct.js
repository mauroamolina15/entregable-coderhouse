import { USER_ROLE } from "../constants";
import { HTTP_STATUS } from "../constants/http";
import UserDao from "../persistence/daos/db/user.dao";
import { HttpResponse } from "./httpResponse";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const http = new HttpResponse();
const userDao = new UserDao();

export const canCreateProduct = async (req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization;
    if (!authHeader)
      return http.unauthorized(res, HTTP_STATUS.UNAUTHORIZED.message);
    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);

    if (user.role !== USER_ROLE.ADMIN && user.role !== USER_ROLE.PREMIUM)
      return http.unauthorized(res, HTTP_STATUS.UNAUTHORIZED.message);
    next();
  } catch (err) {
    next(err.message);
  }
};
