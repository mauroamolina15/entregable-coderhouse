import { ValidationError } from "../managers/error.manager.js";

export const validateRequiredFields = (data, requiredFields = []) => {
  const invalidFields = requiredFields.filter((field) => !data || !data[field]);
  if (invalidFields.length > 0) {
    const errorMessage = `Invalid product. Some required fields were not provided on creation: ${invalidFields.join(
      ", "
    )}`;
    throw new ValidationError(errorMessage);
  }
  if (!Array.isArray(data["thumbnails"]))
    throw new ValidationError(
      'Invalid product. The "thumbnails" field must be an array'
    );
};
