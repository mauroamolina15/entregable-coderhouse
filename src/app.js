import express from "express";
import ProductManager from "./models/ProductManager.js";
import { PRODUCTS_FILE_PATH, SERVER_PORT } from "./constants/index.js";

const app = express();

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);

  try {
    const productManager = new ProductManager(PRODUCTS_FILE_PATH);
    const products = await productManager.getProducts();
    const limitedProducts = isNaN(limit) ? products : products.slice(0, limit);

    return res.status(200).json({
      results: limitedProducts.length,
      data: limitedProducts,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    if (isNaN(productId))
      return res.status(400).json({ msg: "Product ID must be a number value" });
    const productManager = new ProductManager(PRODUCTS_FILE_PATH);
    const product = await productManager.getProductById(productId);
    return product
      ? res.status(200).json({ data: product })
      : res.status(404).json({ msg: `Product with id ${productId} not found` });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
