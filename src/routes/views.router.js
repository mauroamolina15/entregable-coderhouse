import { Router } from "express";
const router = Router();
import * as productService from "../services/product.service.js";
import {
  errorLogin,
  errorRegister,
  login,
  profile,
  register,
  chat,
} from "../controllers/views.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

router.get("/products", async (req, res, next) => {
  const { user } = req.session;
  const products = await productService.getProducts();
  res.render("products", {
    user,
    products: products.docs,
  });
});

router.get("/cart/:cid", async (req, res, next) => {
  res.render("cart");
});

router.get("/login", login);
router.get("/register", register);
router.get("/error-login", errorLogin);
router.get("/error-register", errorRegister);
router.get("/profile", profile);
router.get("/chat", isAuthenticated, chat);

export default router;
