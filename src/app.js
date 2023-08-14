import express from "express";
import router from "./routes/index.js";
import passport from "passport";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";
import { API_ENDPOINT, BD_CONNECTION, SERVER_PORT } from "./constants/index.js";
import { errorHandler } from "./middlewares/errors.js";
import { __dirname } from "./utils.js";
import { connectMongo } from "./daos/db/connection.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { userSession } from "./middlewares/userSession.js";
import "./passport/local-strategy.js";
import "./passport/github-strategy.js";

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: BD_CONNECTION,
    crypto: {
      secret: "1234",
    },
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(userSession);

app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(API_ENDPOINT, router);
app.use(errorHandler);

await connectMongo();

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
