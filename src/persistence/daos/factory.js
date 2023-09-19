import ProductDAO from "./db/product.dao";
import UserDao from "./db/user.dao";
import FSProductDAO from "./fs/product.dao.js";
import FSUserDAO from "./fs/user.dao.js";

let userDao;
let productDao;
let ticketDao;
let persistence = process.argv[2];

switch (persistence) {
  case "file":
    userDao = new FSUserDAO();
    productDao = new FSProductDAO();
    console.log(persistence);
    break;
  case "db":
    userDao = new UserDao();
    productDao = new ProductDAO();
    // ticketDao = new ticketDao();
    console.log(persistence);
  default:
    userDao = new FSUserDAO();
    productDao = new FSProductDAO();
    persistence = "file";
    console.log(persistence);
    break;
}

export default { productDao, userDao, ticketDao };
