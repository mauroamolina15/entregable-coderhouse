import { PRODUCT_REQUIRED_FIELDS } from "../constants/index.js";
import { ValidationError } from "../managers/error.manager.js";

// Si en el body llega una property que no es de product, se elimina
export const verifyProductFields = (req, _res, next) => {
  for (const field in req.body) {
    if (!PRODUCT_REQUIRED_FIELDS.includes(field)) delete req.body[field];
  }
  next();
};

//No es necesario con BD.
export const verifyIDType = (req, _res, next) => {
  Object.keys(req.params).forEach((param) => {
    if (!parseInt(req.params[param]))
      throw new ValidationError(`${param} param must be a number value`);
  });
  next();
};
