import * as service from "../services/user.service.js";

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await service.getProductById(productId);
    return res.status(200).json({ data: product });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const newUser = await service.registerUser(req.body);
    if (newUser) res.redirect("/api/views/login");
    else res.redirect("/api/views/error-register");
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await service.loginUser(req.body);
    if (user) {
      req.session.user = user;
      res.redirect("/api/views/products");
    } else res.redirect("/api/views/error-login");
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};
