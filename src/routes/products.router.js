import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../managers/product.manager.js";
import {
  verifyProductFields,
  verifyIDType,
} from "../middlewares/validations.js";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await getProducts();
    const limitedProducts = isNaN(limit) ? products : products.slice(0, limit);
    return res.status(200).json({
      results: limitedProducts.length,
      data: limitedProducts,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

router.get("/:pid", verifyIDType, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await getProductById(productId);
    return res.status(200).json({ data: product });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

router.post("/", verifyProductFields, async (req, res, next) => {
  try {
    const product = req.body;
    await addProduct(product);
    return res.status(201).json({
      msg: "Product created successfully",
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

router.put(
  "/:pid",
  verifyIDType,
  verifyProductFields,
  async (req, res, next) => {
    try {
      const updatedFields = req.body;
      const productId = parseInt(req.params.pid);
      await updateProduct(productId, updatedFields);
      return res.status(200).json({
        msg: `Product with id ${productId} updated successfully`,
      });
    } catch (err) {
      console.log(`[Error]: ${err.message}`);
      next(err);
    }
  }
);

router.delete("/:pid", verifyIDType, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.pid);
    await deleteProduct(productId);
    return res.status(200).json({
      msg: `Product with id ${productId} deleted successfully`,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
});

export default router;
