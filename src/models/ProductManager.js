import fs from "fs";
import { PRODUCTS_FILE_PATH } from "../constants/index.js";

class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
  }

  async addProduct(product) {
    try {
      console.log("Adding a new product");
      const products = await this.#getProductsFromFile();
      this.#validateProduct(product);
      this.#validateCodeUnique(product.code, products);
      product.id = this.#generateID(products);
      products.push(product);
      await this.#saveProductsToFile(products);
      console.log("Product added successfully");
    } catch (error) {
      console.log(`[Error]: ${error.message}`);
    }
  }

  async getProducts() {
    try {
      return await this.#getProductsFromFile();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.#getProductsFromFile();
      return products.find((prod) => prod.id === id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      console.log(`Updating product with id ${id}`);
      const products = await this.#getProductsFromFile();
      const productIndex = products.findIndex((prod) => prod.id === id);
      if (productIndex === -1)
        throw new Error(`Product with id ${id} not found`);
      if ("id" in updatedFields)
        throw new Error(`Cannot update the "id" field`);
      // Esto es para solo aceptar que actualice campos existentes.
      for (const field in updatedFields) {
        if (field in products[productIndex]) {
          products[productIndex][field] = updatedFields[field];
        }
      }
      this.#validateProduct(products[productIndex]);
      await this.#saveProductsToFile(products);
      console.log("Product updated successfully");
    } catch (error) {
      console.log(`[Error]: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.#getProductsFromFile();
      const updatedProducts = products.filter((prod) => prod.id !== id);
      if (updatedProducts.length === products.length) {
        throw new Error(`Product with id ${id} not found`);
      }
      await this.#saveProductsToFile(updatedProducts);
      console.log("Product deleted successfully");
    } catch (error) {
      console.log(`[Error]: ${error.message}`);
    }
  }

  #validateProduct(product) {
    const requiredFields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    const invalidFields = requiredFields.filter(
      (field) => !product || !product[field]
    );

    if (invalidFields.length > 0) {
      const errorMessage = `Invalid product. Some required fields were not provided on creation: ${invalidFields.join(
        ", "
      )}`;
      throw new Error(errorMessage);
    }
  }

  #validateCodeUnique(code, products) {
    if (products.some((product) => product.code === code)) {
      throw new Error(`Product code "${code}" already exists`);
    }
  }

  #generateID(products) {
    let maxId = 0;
    for (const product of products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  async #getProductsFromFile() {
    try {
      const fileContent = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(fileContent);
    } catch (err) {
      throw new Error("Error getting products.");
    }
  }

  async #saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    await fs.promises.writeFile(this.path, data);
  }
}

export default ProductManager;
