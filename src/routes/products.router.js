import { Router } from "express";
import * as controller from "../controllers/product.controller.js";
import {
  verifyProductFields,
  verifyIDType,
} from "../middlewares/validations.js";
const router = Router();

router.get("/", controller.getProducts);

router.get("/:pid", verifyIDType, controller.getProductById);

router.post("/", verifyProductFields, controller.createProduct);

router.put(
  "/:pid",
  verifyIDType,
  verifyProductFields,
  controller.updateProduct
);

router.delete("/:pid", verifyIDType, controller.deleteProduct);

export default router;
