import { Router } from "express";
import * as controller from "../controllers/product.controller.js";
import { verifyProductFields } from "../middlewares/validations.js";
const router = Router();

router.get("/", controller.getProducts);

router.get("/:pid", controller.getProductById);

router.post("/", verifyProductFields, controller.createProduct);

router.put("/:pid", verifyProductFields, controller.updateProduct);

router.delete("/:pid", controller.deleteProduct);

export default router;
