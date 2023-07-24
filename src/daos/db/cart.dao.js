import { Cart } from "./models/cart.model";
import { Product } from "./models/product.model";

export default class CartDAO {
  async getProductsFromCart(cid) {
    try {
      //TODO: Get products
      const cart = await Cart.findById(cid);
      return cart.products;
    } catch (err) {
      console.log(err);
    }
  }

  async createCart() {
    try {
      const response = await Cart.create();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(pid, cid) {
    try {
      const cart = await Cart.findById(cid);
      cart.products.push(pid);
      cart.save();
      return cart;
    } catch (err) {
      console.log(err);
    }
  }
}
