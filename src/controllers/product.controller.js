import { TEXTS } from "../constants/texts.js";
import * as service from "../services/product.service.js";
import { validateRequiredFields } from "../utils/validations.js";

export const getProducts = async (req, res, next) => {
  try {
    // const products = await getProducts();
    // const limitedProducts = isNaN(limit) ? products : products.slice(0, limit);
    const limit = parseInt(req.query.limit);
    const products = await service.getProducts(limit);
    return res.status(200).json({
      results: products.length,
      data: products,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await service.getProductById(productId);
    return res.status(200).json({ data: product });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    validateRequiredFields(product, PRODUCT_REQUIRED_FIELDS);
    //validateCodeUnique(product.code, products);
    await service.createProduct(product);
    return res.status(201).json({
      msg: TEXTS.CREATED_PRODUCT,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

//TODO: Chequear este
export const updateProduct = async (req, res, next) => {
  try {
    const updatedFields = req.body;
    const productId = req.params.pid;
    // await updateProduct(productId, updatedFields);
    await service.updateProduct(productId, updatedFields);
    return res.status(200).json({
      msg: TEXTS.CRUD_ACTION_SUCCESS(productId, "updated"),
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    service.deleteProduct(productId);
    return res.status(200).json({
      msg: TEXTS.CRUD_ACTION_SUCCESS(productId, "deleted"),
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};
