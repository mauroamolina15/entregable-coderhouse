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

  async createCart({ email }) {
    try {
      const response = await Cart.create({ email });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(pid, cid) {
    try {
      const product = await Product.findById(pid);
      const cart = await this.getCartById(cid);

      const productInCart = cart.products.find(
        (item) => item.product._id.toString() === product._id.toString()
      );
      if (productInCart) productInCart.quantity += 1;
      else
        cart.products.push({
          product,
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
      const cart = await this.getCartById(cid);
      if (!cart) throw new Error("No existe el carrito");
      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== pid.toString()
      );
      await cart.save();

      return { message: "Producto eliminado.", cart };
    } catch (err) {
      console.log(err);
    }
  }

  async updateCart(cid, cart) {
    try {
      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: Check
  async updateProductQuantityFromCart(cid, pid, quantity) {
    try {
      if (quantity <= 0) return await this.deleteProductFromCart(pid, cid);
      const cart = await this.getCartById(cid);
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

  async deleteAllCarts() {
    try {
      const response = await Cart.deleteMany({});
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async createMockCarts() {
    try {
      const users = await UserModel.find({}).select("email");

      users.forEach(async (user) => {
        const cart = new Cart({ email: user.email });
        await cart.save();
      });

      const carts = await Cart.find({});

      carts.forEach(async (cart) => {
        const products = await ProductModel.find({});

        const randomQuantity = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < randomQuantity; i++) {
          const randomProduct =
            products[Math.floor(Math.random() * products.length)];
          const quantity = Math.floor(Math.random() * 3) + 1;
          cart.products.push({ product: randomProduct, quantity: quantity });
        }
        await cart.save();
      });

      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      const response = await Cart.findById(cid).populate("products.product");
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getCarts() {
    try {
      const response = await Cart.find({}).populate("products.product");
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart(cid) {
    try {
      const response = await Cart.findByIdAndDelete(cid);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getCartByEmail(email) {
    try {
      const cart = await Cart.findOne({ email, complete: false }).populate(
        "products.product"
      );
      return cart;
    } catch (err) {
      console.log(err);
    }
  }

  async getTotal(cid) {
    try {
      const cart = await this.getCartById(cid);
      return cart.products.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
    } catch (err) {
      console.log(err);
    }
  }
}
