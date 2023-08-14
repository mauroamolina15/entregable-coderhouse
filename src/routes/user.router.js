import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import passport from "passport";
const router = Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/api/views/login?registerSuccessful=true",
    failureRedirect: "/error-register",
    passReqToCallback: true,
  })
);

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/api/views/products?loginSuccessful=true",
    failureRedirect: "/error-login",
    passReqToCallback: true,
  })
);

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
