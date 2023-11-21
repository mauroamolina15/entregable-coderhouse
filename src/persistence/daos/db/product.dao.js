import { TEXTS } from "../../../constants/texts.js";
import { NotFoundError } from "../../../managers/error.manager.js";
import { Cart } from "./models/cart.model.js";
import { Product } from "./models/product.model.js";
import * as cartService from "./../../../services/cart.service.js";

export default class ProductDAO {
  //TODO: Refactor busqueda
  async getProducts(args = {}) {
    try {
      const { limit = 10, page = 1, query, sort } = args;
      const queryOptions = {};
      const sortOptions = {};
      if (query) {
        if (query === "available") queryOptions.status = true;
        else queryOptions.category = query;
      }
      if (sort) sortOptions.price = sort === "asc" ? 1 : -1;
      const paginateOptions = { page, limit, sort: sortOptions };
      const response = await Product.paginate(queryOptions, paginateOptions);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getProductById(id) {
    try {
      const response = await Product.findById(id);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async createProduct(product) {
    try {
      const response = await Product.create(product);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async updateProduct(pid, product) {
    try {
      const response = await Product.findByIdAndUpdate(pid, product, {
        new: true,
      });
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteProduct(pid) {
    try {
      const productDeleted = await Product.findByIdAndDelete(pid);
      if (productDeleted) return productDeleted;
      throw new NotFoundError(TEXTS.PRODUCT_DELETE_ERROR(pid));
    } catch (err) {
      console.log(err.message);
    }
  }

  async getProductByCode(code) {
    try {
      const response = await Product.findOne({ code });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getCategories() {
    try {
      const response = await Product.distinct("category");
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateProduct(product) {
    try {
      const prodExists = await Product.findById(product._id);
      if (!prodExists) return false;
      const updateProduct = await Product.updateOne(
        { _id: product._id },
        product
      );
      return updateProduct;
    } catch (err) {
      logger.error(err);
    }
  }

  async checkStock(cid) {
    try {
      let deleted = false;
      const cart = await Cart.findById(cid).populate("products.product");
      const promises = cart.products.map(async (prod) => {
        const product = await Product.findById(prod.product._id);
        if (product.stock < prod.quantity) {
          if (prod.quantity < 0) {
            prod.quantity = product.stock;
            await cart.save();
            await product.save();
            deleted = true;
          } else {
            deleted = true;
            await cartService.deleteProductFromCart(product._id, cid);
          }
        }
      });
      await Promise.all(promises);
      return deleted;
    } catch (err) {
      logger.error(err);
    }
  }

  async updateStock(cid) {
    try {
      const cart = await Cart.findById(cid).populate("products.product");
      cart.products.forEach(async (prod) => {
        const product = await Product.findById(prod.product._id);
        product.stock -= prod.quantity;
        await product.save();
      });
    } catch (err) {
      logger.error(err);
    }
  }
}
