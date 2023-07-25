import { TEXTS } from "../constants/texts.js";
import * as service from "../services/cart.service.js";

export const getProductsFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const products = await service.getProductsFromCart(cartId);
    res.status(200).json({
      results: products.length,
      products,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const createCart = async (req, res, next) => {
  try {
    await service.createCart();
    return res.status(201).json({
      msg: TEXTS.CREATED_CART,
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await service.addProductToCart(productId, cartId);
    res.status(200).json({
      msg: TEXTS.CRUD_ACTION_SUCCESS(productId, "added"),
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};
