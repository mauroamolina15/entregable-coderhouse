import CartDAO from "../daos/db/cart.dao";
import { ValidationError } from "../managers/error.manager";

const cartDAO = new CartDAO();

export const getProductsFromCart = async () => {
  try {
    const response = await cartDAO.getProductsFromCart();
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const createCart = async () => {
  try {
    const newCart = await cartDAO.createCart();
    if (!newCart) return false;
    return newCart;
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

export const addProductToCart = async (pid, cid) => {
  try {
    const productAdded = await cartDAO.addProductToCart(pid, cid);
  } catch (err) {
    console.log(err);
  }
};
