import express from "express";
import router from "./routes/index.js";
import { API_ENDPOINT, SERVER_PORT } from "./constants/index.js";
import { errorHandler } from "./middlewares/errors.js";

import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { connectMongo } from "./daos/db/connection.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(API_ENDPOINT, router);
app.use(errorHandler);

await connectMongo();

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
