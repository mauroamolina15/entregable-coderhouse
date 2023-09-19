import { TEXTS } from "../../../constants/texts.js";
import { NotFoundError } from "../../../managers/error.manager.js";
import { Product } from "./models/product.model.js";

export default class ProductDAO {
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
}
