import { NotFoundError, ValidationError } from "./error.manager.js";
import {
  generateIncrementalID,
  getDataFromFile,
  saveDataInFile,
} from "../utils/index.js";
import {
  PRODUCTS_FILE_PATH,
  PRODUCT_REQUIRED_FIELDS,
} from "../constants/index.js";
import { validateRequiredFields } from "../utils/validations.js";

export const addProduct = async (product) => {
  try {
    const products = await getDataFromFile(PRODUCTS_FILE_PATH);
    validateRequiredFields(product, PRODUCT_REQUIRED_FIELDS);
    validateCodeUnique(product.code, products);
    product.id = generateIncrementalID(products);
    products.push(product);
    await saveDataInFile(PRODUCTS_FILE_PATH, products);
  } catch (err) {
    throw err;
  }
};

export const getProducts = async () => {
  try {
    return await getDataFromFile(PRODUCTS_FILE_PATH);
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (pid) => {
  try {
    const products = await getDataFromFile(PRODUCTS_FILE_PATH);
    const product = products.find((product) => product.id === pid);
    if (!product) throw new NotFoundError(`Product with id ${pid} not found.`);
    return product;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (pid, updatedFields) => {
  try {
    const products = await getDataFromFile(PRODUCTS_FILE_PATH);
    const productIndex = products.findIndex((prod) => prod.id === pid);
    if (productIndex === -1)
      throw new NotFoundError(`Product with id ${pid} not found`);
    if ("id" in updatedFields)
      throw new ValidationError("Cannot update Product ID field");
    for (const field in updatedFields) {
      products[productIndex][field] = updatedFields[field];
    }
    validateRequiredFields(products[productIndex]);
    await saveDataInFile(PRODUCTS_FILE_PATH, products);
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (pid) => {
  try {
    const products = await getDataFromFile(PRODUCTS_FILE_PATH);
    const updatedProducts = products.filter((prod) => prod.id !== pid);
    if (updatedProducts.length === products.length)
      throw new NotFoundError(`Product with id ${pid} not found`);
    await saveDataInFile(PRODUCTS_FILE_PATH, updatedProducts);
  } catch (err) {
    throw err;
  }
};

const validateCodeUnique = (code, products) => {
  if (products.some((product) => product.code === code)) {
    throw new ValidationError(`Product code "${code}" already exists`);
  }
};
