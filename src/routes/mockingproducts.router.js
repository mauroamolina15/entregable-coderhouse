import { Router } from "express";
import { generateFakeProduct } from "../utils/index.js";
const router = Router();

router.get("/", async (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) products.push(generateFakeProduct());
  res.send({ status: "success", payload: products });
});

export default router;
