import { BDError } from "../../managers/error.manager.js";
import { Product } from "./models/product.model.js";

export default class ProductDAO {
  async getProducts(limit = 0) {
    try {
      const response = await Product.find({}).limit(limit || null);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      const response = await Product.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(product) {
    try {
      const response = await Product.create(product);
      return response;
    } catch (error) {
      console.log({ error });
      throw new BDError(error.message);
    }
  }

  async updateProduct(pid, product) {
    try {
      const response = await Product.findByIdAndUpdate(pid, product, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(pid) {
    try {
      const response = await Product.findByIdAndDelete(pid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
