import { connect } from "mongoose";
import "dotenv/config";
import { TEXTS } from "../constants/texts.js";
import { BDError } from "../managers/error.manager.js";

export const connectionString = process.env.MONGO_DB_URL;

try {
  await connect(connectionString);
  console.log(TEXTS.BD_CONNECTION_SUCCESS);
} catch (err) {
  console.log(err);
  throw BDError(err.message);
}
