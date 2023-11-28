import * as service from "../services/user.service.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const user = await service.getByIdDTO(req.user.id);
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
    next(error.message);
  }
};
