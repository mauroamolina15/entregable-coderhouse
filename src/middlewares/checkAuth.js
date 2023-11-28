import { HTTP_STATUS } from "../constants/http";
import UserDao from "../persistence/daos/db/user.dao";
import { HttpResponse } from "./httpResponse";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const userDao = new UserDao();
const http = new HttpResponse();

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization;
    if (!authHeader) return req.redirect("/login?logout=e");

    try {
      const decode = jwt.verify(authHeader, PRIVATE_KEY);
      const user = await userDao.getById(decode.userId);
      if (!user)
        return http.unauthorized(res, HTTP_STATUS.UNAUTHORIZED.message);
      req.user = user;
      next();
    } catch (err) {
      res.clearCookie("Authorization");
      res.redirect("/login");
    }
  } catch (err) {
    next(err.message);
  }
};
