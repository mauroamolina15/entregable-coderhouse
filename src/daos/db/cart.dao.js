import { TEXTS } from "../../constants/texts.js";
import { BDError, NotFoundError } from "../../managers/error.manager.js";
import { Cart } from "./models/cart.model.js";
import { Product } from "./models/product.model.js";

export default class CartDAO {
  async getProductsFromCart(cid) {
    //TODO: Fix errores
    try {
      const cart = await Cart.findById(cid).populate("products");
      if (!cart) throw new NotFoundError(TEXTS.CART_NOT_FOUND(cid));
      return cart.products;
    } catch (err) {
      console.log(err);
    }
  }

  async createCart() {
    try {
      const response = await Cart.create({});
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(pid, cid) {
    try {
      const cart = await Cart.findById(cid).populate("products");
      const productInCart = cart.products.find((item) =>
        item.product._id.equals(pid)
      );
      if (productInCart) productInCart.quantity += 1;
      else
        cart.products.push({
          product: pid,
          quantity: 1,
        });
      await cart.save();
      return cart;
    } catch (err) {
      console.log(err);
    }
  }
}
