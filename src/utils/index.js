import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { existsSync, promises } from "fs";
import jwt from "jsonwebtoken";

export const getJwtKey = () => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  return PRIVATE_KEY;
};

export const getDataFromFile = async (path) => {
  if (!existsSync(path)) return [];
  const data = await promises.readFile(path, "utf-8");
  const jsonData = JSON.parse(data);
  return jsonData;
};

export const saveDataInFile = async (path, data) => {
  await promises.writeFile(path, JSON.stringify(data));
};

export const generateIncrementalID = (items) => {
  let maxId = 0;
  for (const item of items) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
};

export const hash = (pwd) => hashSync(pwd, genSaltSync(10));

export const isValidPassword = (pwd, user) => compareSync(pwd, user.password);

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};
