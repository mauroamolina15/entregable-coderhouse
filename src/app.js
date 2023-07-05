import express from "express";
import router from "./routes/index.js";
import { API_ENDPOINT, SERVER_PORT } from "./constants/index.js";
import { errorHandler } from "./middlewares/errors.js";

import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "./managers/product.manager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(API_ENDPOINT, router);
app.use(errorHandler);

const appServer = app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});

const socketServer = new Server(appServer);

socketServer.on("connection", async (socket) => {
  console.log(`¡Nueva Conexión! Socket id ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`usuario desconectado ${socket.id}`);
  });

  const products = await getProducts();
  socket.emit("getProductsResponse", products);

  socket.on("newProduct", async (product) => {
    try {
      await addProduct(product);
      socketServer.emit("addedProduct", product);
    } catch (err) {
      socket.emit("error", err.message);
      console.log(err.message);
    }
  });

  socket.on("deleteProduct", async (pid) => {
    try {
      await deleteProduct(parseInt(pid));
    } catch (err) {
      socket.emit("error", err.message);
      console.log(err.message);
    }
  });
});
