import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";
import { verifyIDType } from "../middlewares/validations.js";
const router = Router();

router.post("/", controller.createCart);

router.get("/:cid", verifyIDType, controller.getProductsFromCart);

router.post("/:cid/product/:pid", controller.addProductToCart);

router.delete("/:cid/product/:pid", controller.deleteProductFromCart);

router.put("/:cid", controller.updateCart);

router.put("/:cid/product/:pid", controller.updateProductQuantityFromCart);

router.delete("/:cid", controller.deleteAllProductsFromCart);

export default router;
