import * as service from "../services/user.service.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log("gere");
    const user = await service.getByIdDTO(req.user.id);
    console.log({ method: req.method, path: req.path });
    if (req.method != "GET") {
      if (req.baseUrl === "/api/products") {
        if (req.isAuthenticated() && user.role == "admin") return next();
        else res.status(401).send({ msg: "Unauthorized" });
      }
      if (req.baseUrl === "/api/carts") {
        if (req.isAuthenticated() && user.role == "user") return next();
        else res.status(401).send({ msg: "Unauthorized" });
      }
    } else {
      if (req.path === "/chat")
        if (req.isAuthenticated() && user.role == "user") return next();
        else res.status(401).send({ msg: "Unauthorized" });
      else next();
    }
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};
