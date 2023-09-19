import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";
import { verifyIDType } from "../middlewares/validations.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = Router();

router.post("/", isAuthenticated, controller.createCart);

router.get("/:cid", verifyIDType, controller.getProductsFromCart);

router.post("/:cid/product/:pid", controller.addProductToCart);

router.delete(
  "/:cid/product/:pid",
  isAuthenticated,
  controller.deleteProductFromCart
);

router.put("/:cid", isAuthenticated, controller.updateCart);

router.put(
  "/:cid/product/:pid",
  isAuthenticated,
  controller.updateProductQuantityFromCart
);

router.delete("/:cid", isAuthenticated, controller.deleteAllProductsFromCart);

export default router;
