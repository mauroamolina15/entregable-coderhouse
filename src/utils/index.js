import { existsSync, promises } from "fs";

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
