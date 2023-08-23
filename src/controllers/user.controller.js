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
    const token = await service.loginUser(req.body);
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/api/views/products");
    } else res.redirect("/api/views/error-login");
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const viewRegister = async (req, res, next) => {
  try {
    const newUser = await service.registerUser(req.body);

    if (!newUser) res.redirect("/error-register");
    else res.redirect("/login?registerSuccessful=true");
  } catch (error) {
    next(error.message);
  }
};

export const viewLogin = async (req, res, next) => {
  try {
    const token = await service.loginUser(req.body);

    if (!token) return res.redirect("/error-login");

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/products?loginSuccessful=true");
  } catch (error) {
    next(error.message);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
};

export const viewLogout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
