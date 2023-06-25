import express from "express";
import router from "./routes/index.js";
import { API_ENDPOINT, SERVER_PORT } from "./constants/index.js";
import { errorHandler } from "./middlewares/errors.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_ENDPOINT, router);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
