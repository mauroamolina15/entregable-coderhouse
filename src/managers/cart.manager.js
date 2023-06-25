import { CARTS_FILE_PATH } from "../constants/index.js";
import {
  generateIncrementalID,
  getDataFromFile,
  saveDataInFile,
} from "../utils/index.js";
import { NotFoundError } from "./error.manager.js";
import { getProductById } from "./product.manager.js";

export const createCart = async () => {
  try {
    const carts = await getDataFromFile(CARTS_FILE_PATH);
    const cart = {
      id: generateIncrementalID(carts),
      products: [],
    };
    carts.push(cart);
    await saveDataInFile(CARTS_FILE_PATH, carts);
  } catch (err) {
    throw err;
  }
};

export const getProductsFromCart = async (cid) => {
  try {
    const carts = await getDataFromFile(CARTS_FILE_PATH);
    const cart = carts.findIndex((item) => item.id === cid);
    if (cart === -1) throw new NotFoundError(`Cart with id ${cid} not found`);
    return carts[cart].products;
  } catch (err) {
    throw err;
  }
};

export const addProductToCart = async (pid, cid) => {
  try {
    await getProductById(pid);
    const carts = await getDataFromFile(CARTS_FILE_PATH);
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) throw new NotFoundError(`Cart with id ${cid} not found`);
    const productInCart = cart.products.find((prod) => prod.id === pid);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      const newProd = {
        id: pid,
        quantity: 1,
      };
      cart.products.push(newProd);
    }
    await saveDataInFile(CARTS_FILE_PATH, carts);
  } catch (err) {
    throw err;
  }
};
