import { TEXTS } from "../../../constants/texts.js";
import { BDError, NotFoundError } from "../../../managers/error.manager.js";
import { Cart } from "./models/cart.model.js";
import { Product } from "./models/product.model.js";

export default class CartDAO {
  async getProductsFromCart(cid) {
    try {
      const cart = await Cart.findById(cid).populate({
        path: "products",
        populate: {
          path: "product",
          model: "products",
        },
      });
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

  async deleteProductFromCart(pid, cid) {
    try {
      const cart = await Cart.findById(cid).populate("products");
      const productInCart = cart.products.findIndex((item) =>
        item.product._id.equals(pid)
      );
      if (productInCart !== -1) {
        cart.products.splice(productInCart, 1);
        await cart.save();
        return cart;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateCart(cid, products) {
    try {
      const cart = await Cart.findById(cid);
      cart.products = products;
      await cart.save();
      return cart;
    } catch (err) {
      console.log(err);
    }
  }

  async updateProductQuantityFromCart(cid, pid, quantity) {
    try {
      if (quantity <= 0) return await this.deleteProductFromCart(pid, cid);
      const cart = await Cart.findById(cid).populate("products");
      const productInCart = cart.products.find((item) =>
        item.product._id.equals(pid)
      );
      if (productInCart) {
        productInCart.quantity = quantity;
        return await cart.save();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      const cart = await Cart.findById(cid);
      cart.products = [];
      await cart.save();
      return cart;
    } catch (err) {
      console.log(err);
    }
  }
}
