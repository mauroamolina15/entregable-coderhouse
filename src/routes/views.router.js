import { Router } from "express";
const router = Router();
import * as productService from "../services/product.service.js";

router.get("/products", async (req, res, next) => {
  const products = await productService.getProducts();
  res.render("products", {
    products: products.docs,
  });
});

router.get("/cart/:cid", async (req, res, next) => {
  res.render("cart");
});

export default router;
