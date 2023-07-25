import { TEXTS } from "../../constants/texts.js";
import { NotFoundError } from "../../managers/error.manager.js";
import { Product } from "./models/product.model.js";

export default class ProductDAO {
  async getProducts(limit = 0) {
    try {
      const response = await Product.find({}).limit(limit || null);
      return response;
    } catch (err) {
      //TODO: handleDAOError(error);
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
}
