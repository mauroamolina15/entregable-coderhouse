import { USER_ROLE } from "../constants";
import { HTTP_STATUS } from "../constants/http";
import ProductDAO from "../persistence/daos/db/product.dao";
import UserDao from "../persistence/daos/db/user.dao";
import { HttpResponse } from "./httpResponse";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const http = new HttpResponse();
const userDao = new UserDao();
const productDao = new ProductDAO();

export const canModifyProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productDao.getProductById(id);

    const authHeader = req.cookies.Authorization;
    if (!authHeader)
      return http.unauthorized(res, HTTP_STATUS.UNAUTHORIZED.message);

    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);

    if (
      user.role !== USER_ROLE.ADMIN &&
      (user.role !== USER_ROLE.PREMIUM || product.owner !== user.email)
    )
      return http.unauthorized(
        res,
        "No se puede realizar esta acción sobre el producto. Es necesario ser un administrador o dueño del producto."
      );
    next();
  } catch (err) {
    next(err.message);
  }
};
