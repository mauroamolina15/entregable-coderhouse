import { Router } from "express";
import {
  addProductToCart,
  createCart,
  getProductsFromCart,
} from "../managers/cart.manager.js";
import { verifyIDType } from "../middlewares/validations.js";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    await createCart();
    return res.status(201).json({
      msg: "Cart created successfully",
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

router.get("/:cid", verifyIDType, async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cid);
    const products = await getProductsFromCart(cartId);
    res.status(200).json({
      results: products.length,
      products,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

router.post("/:cid/product/:pid", verifyIDType, async (req, res, next) => {
  try {
    console.log("here");
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    await addProductToCart(productId, cartId);
    res.status(200).json({
      msg: `Product with id ${productId} added successfully`,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

export default router;
