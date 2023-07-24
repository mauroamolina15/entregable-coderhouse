import mongoose from "mongoose";
import { BD_CONNECTION } from "../../constants/index.js";
import { BDError } from "../../managers/error.manager.js";
import { TEXTS } from "../../constants/texts.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(BD_CONNECTION);
    console.log(TEXTS.BD_CONNECTION_SUCCESS);
  } catch (err) {
    console.log(err);
    throw BDError(err.message);
  }
};
