export const TEXTS = {
  CREATED_PRODUCT: "Product created successfully",
  CRUD_ACTION_SUCCESS: (pid, action) =>
    `Product with id ${pid} ${action} successfully`,
  PRODUCT_NOT_FOUND: (pid) => `Product with id ${pid} not found`,
  CANNOT_UPDATE_ID: "Cannot update ID field",
  PRODUCT_CODE_ALREADY_EXISTS: (code) => `Product code ${code} already exists`,
  CART_NOT_FOUND: (cid) => `Cart with id ${cid} not found`,
  CREATED_CART: () => "Cart created successfully",
};
