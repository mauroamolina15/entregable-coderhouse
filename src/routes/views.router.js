import { Router } from "express";
import { getProducts } from "../managers/product.manager.js";
const router = Router();

router.get("/realtimeproducts", async (req, res, next) => {
  res.render("realTimeProducts");
});

router.get("/", async (req, res, next) => {
  const products = await getProducts();
  res.render("", { products });
});

export default router;
