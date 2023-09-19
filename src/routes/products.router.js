import { Router } from "express";
import * as controller from "../controllers/product.controller.js";
import { verifyProductFields } from "../middlewares/validations.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = Router();

router.get("/", controller.getProducts);

router.get("/:pid", controller.getProductById);

router.post(
  "/",
  verifyProductFields,
  isAuthenticated,
  controller.createProduct
);

router.put(
  "/:pid",
  verifyProductFields,
  isAuthenticated,
  controller.updateProduct
);

router.delete("/:pid", isAuthenticated, controller.deleteProduct);

export default router;
