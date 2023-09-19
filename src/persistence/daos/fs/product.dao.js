import {
  PRODUCTS_FILE_PATH,
  PRODUCT_REQUIRED_FIELDS,
} from "../../../constants/index.js";
import { TEXTS } from "../../../constants/texts.js";
import {
  NotFoundError,
  ValidationError,
} from "../../../managers/error.manager.js";
import {
  getDataFromFile,
  saveDataInFile,
  generateIncrementalID,
} from "../../../utils/index.js";
import { validateRequiredFields } from "../../../utils/validations.js";

export default class FSProductDAO {
  async addProduct(product) {
    try {
      const products = await getDataFromFile(PRODUCTS_FILE_PATH);
      validateRequiredFields(product, PRODUCT_REQUIRED_FIELDS);
      this.validateCodeUnique(product.code, products);
      product.id = generateIncrementalID(products);
      products.push(product);
      await saveDataInFile(PRODUCTS_FILE_PATH, products);
    } catch (err) {
      throw err;
    }
  }

  async getProducts() {
    try {
      return await getDataFromFile(PRODUCTS_FILE_PATH);
    } catch (err) {
      throw err;
    }
  }

  async getProductById(pid) {
    try {
      const products = await getDataFromFile(PRODUCTS_FILE_PATH);
      const product = products.find((product) => product.id === pid);
      if (!product) throw new NotFoundError(TEXTS.PRODUCT_NOT_FOUND(pid));
      return product;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(pid, updatedFields) {
    try {
      const products = await getDataFromFile(PRODUCTS_FILE_PATH);
      const productIndex = products.findIndex((prod) => prod.id === pid);
      if (productIndex === -1)
        throw new NotFoundError(TEXTS.PRODUCT_NOT_FOUND(pid));
      if ("id" in updatedFields)
        throw new ValidationError(TEXTS.CANNOT_UPDATE_ID);
      for (const field in updatedFields) {
        products[productIndex][field] = updatedFields[field];
      }
      validateRequiredFields(products[productIndex]);
      await saveDataInFile(PRODUCTS_FILE_PATH, products);
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(pid) {
    try {
      const products = await getDataFromFile(PRODUCTS_FILE_PATH);
      const updatedProducts = products.filter((prod) => prod.id !== pid);
      if (updatedProducts.length === products.length)
        throw new NotFoundError(TEXTS.PRODUCT_NOT_FOUND(pid));
      await saveDataInFile(PRODUCTS_FILE_PATH, updatedProducts);
    } catch (err) {
      throw err;
    }
  }

  validateCodeUnique(code, products) {
    if (products.some((product) => product.code === code)) {
      throw new ValidationError(TEXTS.PRODUCT_CODE_ALREADY_EXISTS(code));
    }
  }
}
