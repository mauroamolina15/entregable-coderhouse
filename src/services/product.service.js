import ProductDAO from "../daos/db/product.dao.js";
import { ServiceError, ValidationError } from "../managers/error.manager.js";

const productDAO = new ProductDAO();

export const getProducts = async (limit = 0) => {
  try {
    const response = await productDAO.getProducts(limit);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productDAO.getProductById(id);
    if (!product) return false;
    else return product;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (product) => {
  try {
    const newProd = await productDAO.createProduct(product);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    throw new ValidationError(error.message);
  }
};

export const updateProduct = async (pid, product) => {
  try {
    const updatedProduct = await productDAO.updateProduct(pid, product);
    return updatedProduct;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pid) => {
  try {
    const deletedProduct = await productDAO.deleteProduct(pid);
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
};
