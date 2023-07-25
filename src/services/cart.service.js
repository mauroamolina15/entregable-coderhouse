import { TEXTS } from "../constants/texts.js";
import CartDAO from "../daos/db/cart.dao.js";
import { ValidationError } from "../managers/error.manager.js";

const cartDAO = new CartDAO();

export const getProductsFromCart = async (cid) => {
  try {
    const response = await cartDAO.getProductsFromCart(cid);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createCart = async () => {
  try {
    const newCart = await cartDAO.createCart();
    if (newCart) return newCart;
    throw new ValidationError(TEXTS.CART_CREATION_ERROR);
  } catch (err) {
    throw err;
  }
};

export const addProductToCart = async (pid, cid) => {
  try {
    const productAdded = await cartDAO.addProductToCart(pid, cid);
    if (productAdded) return productAdded;
    throw new ValidationError(TEXTS.ADD_PRODUCT_TO_CART_ERROR(pid, cid));
  } catch (err) {
    throw err;
  }
};
