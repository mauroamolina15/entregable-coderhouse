import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getByIdDTO } from "../controllers/user.controller.js";

const router = Router();

router.get("/current", getByIdDTO, isAuthenticated, (req, res) => {
  res.render("profile");
});

export default router;
