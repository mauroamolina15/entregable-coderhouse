import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import passport from "passport";
const router = Router();

router.post("/register", controller.registerUser);
router.post("/register-front", controller.viewRegister);
router.post("/login", controller.loginUser);
router.post("/login-front", controller.viewLogin);
router.get("/logout", controller.logout);
router.get("/logout-front", controller.viewLogout);
router.get(
  "/register-github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    failureRedirect: "/error-login",
    successRedirect: "/api/views/products?loginSuccessful=true",
  })
);

export default router;
