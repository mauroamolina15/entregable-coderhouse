import { ERROR_CODE } from "../constants/errors.js";

const createErrorFactory = function (errorStatusCode) {
  return class ErrorManager extends Error {
    constructor(message) {
      super(message);
      this.status = errorStatusCode;
    }
  };
};

export const ServerError = createErrorFactory(ERROR_CODE.SERVER);
export const ValidationError = createErrorFactory(ERROR_CODE.VALIDATION);
export const NotFoundError = createErrorFactory(ERROR_CODE.NOT_FOUND);
