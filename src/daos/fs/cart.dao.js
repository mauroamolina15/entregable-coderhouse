import { CARTS_FILE_PATH } from "../../constants/index.js";
import { TEXTS } from "../../constants/texts.js";
import { NotFoundError } from "../../managers/error.manager.js";
import { getProductById } from "../../managers/product.manager.js";
import {
  saveDataInFile,
  getDataFromFile,
  generateIncrementalID,
} from "../../utils/index.js";

export default class FSCartDAO {
  async createCart() {
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
  }

  async getProductsFromCart(cid) {
    try {
      const carts = await getDataFromFile(CARTS_FILE_PATH);
      const cart = carts.findIndex((item) => item.id === cid);
      if (cart === -1) throw new NotFoundError(TEXTS.CART_NOT_FOUND(cid));
      return carts[cart].products;
    } catch (err) {
      throw err;
    }
  }

  async addProductToCart(pid, cid) {
    try {
      await getProductById(pid);
      const carts = await getDataFromFile(CARTS_FILE_PATH);
      const cart = carts.find((cart) => cart.id === cid);
      if (!cart) throw new NotFoundError(TEXTS.CART_NOT_FOUND(cid));
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
  }
}
