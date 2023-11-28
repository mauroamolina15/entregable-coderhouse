import ProductDAO from "../persistence/daos/db/product.dao.js";
import {
  NotFoundError,
  ServerError,
  ServiceError,
  ValidationError,
} from "../managers/error.manager.js";
import { TEXTS } from "../constants/texts.js";

const productDAO = new ProductDAO();

export const getProducts = async (args) => {
  try {
    const response = await productDAO.getProducts(args);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (pid) => {
  try {
    const product = await productDAO.getProductById(pid);
    if (product) return product;
    throw new NotFoundError(TEXTS.PRODUCT_NOT_FOUND(pid));
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const newProd = await productDAO.createProduct(product);
    if (newProd) return newProd;
    throw new ValidationError(TEXTS.PRODUCT_CREATION_ERROR);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (pid, product) => {
  try {
    const updatedProduct = await productDAO.updateProduct(pid, product);
    if (updatedProduct) return updateProduct;
    throw new ValidationError(TEXTS.PRODUCT_UPDATING_ERROR(pid));
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (pid) => {
  try {
    const deletedProduct = await productDAO.deleteProduct(pid);
    if (deletedProduct) return deletedProduct;
    throw new NotFoundError(TEXTS.PRODUCT_DELETE_ERROR);
  } catch (error) {
    throw error;
  }
};

export const deleteAllProducts = async () => {
  try {
    const products = await productDAO.deleteAll();
    if (!products) return false;
    else return { msg: "Productos eliminados exitosamente." };
  } catch (error) {
    throw error;
  }
};

export const getProductByCode = async () => {
  try {
    const product = await productDAO.getProductByCode(code);
    return product ? product : false;
  } catch (error) {
    logger.error(error);
  }
};
