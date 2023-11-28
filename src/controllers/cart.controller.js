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
    const createdCart = await service.createCart();
    return res.status(201).json({
      msg: TEXTS.CREATED_CART,
      payload: createdCart,
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

export const deleteProductFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await service.deleteProductFromCart(productId, cartId);
    res.status(200).json({
      msg: "",
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;
    await service.updateCart(cartId, products);
    res.status(200).json({
      msg: "",
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const updateProductQuantityFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    await service.updateProductQuantityFromCart(cid, pid, quantity);
    res.status(200).json({
      msg: "",
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const deleteAllProductsFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    await service.deleteAllProductsFromCart(cid);
    res.status(200).json({
      msg: "",
    });
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};

export const createTicket = async (req, res, next) => {
  try {
  } catch (error) {
    next(error.message);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const cart = await service.getCart(idCart);
  } catch (err) {
    console.log(`[Error]: ${err.message}`);
    next(err);
  }
};
