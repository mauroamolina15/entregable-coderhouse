import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";
import { verifyIDType } from "../middlewares/validations.js";
const router = Router();

router.post("/", controller.createCart);

router.get("/:cid", verifyIDType, controller.getProductsFromCart);

router.post("/:cid/product/:pid", verifyIDType, controller.addProductToCart);

export default router;
