export const TEXTS = {
  CREATED_PRODUCT: "Product created successfully",
  CRUD_ACTION_SUCCESS: (pid, action) =>
    `Product with id ${pid} ${action} successfully`,
  PRODUCT_NOT_FOUND: (pid) => `Product with id ${pid} not found`,
  CANNOT_UPDATE_ID: "Cannot update ID field",
  PRODUCT_CODE_ALREADY_EXISTS: (code) => `Product code ${code} already exists`,
  CART_NOT_FOUND: (cid) => `Cart with id ${cid} not found`,
  CREATED_CART: "Cart created successfully",
  BD_CONNECTION_ERROR: "Error trying to connect to database",
  BD_CONNECTION_SUCCESS: "🚀 Database connected successfully!",
  SERVER_ERROR: "Server error",
  CART_CREATION_ERROR: "Error creating a new cart",
  ADD_PRODUCT_TO_CART_ERROR: (pid, cid) =>
    `Error adding product with id ${pid} to cart ${cid}`,
  PRODUCT_CREATION_ERROR: "Error creating a new product",
  PRODUCT_UPDATING_ERROR: (pid) => `Error updating product with id ${pid}`,
  PRODUCT_DELETE_ERROR: `Error deleting product`,
};
