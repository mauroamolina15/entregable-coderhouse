import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
const router = Router();

router.post("/register", controller.registerUser);
router.post("/register-front", controller.viewRegister);
router.post("/login", controller.loginUser);
router.post("/login-front", controller.viewLogin);
router.get("/logout", controller.logout);
router.get("/logout-front", controller.viewLogout);

export default router;
