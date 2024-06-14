import { Router } from "express";
import * as authController from "../controllers/login.controller.js";
import * as validateUser from "../validators/user.js";
import { verifySignUp } from "../middleware/verifySignUp.js";

const router = Router();

router.post("/signin", authController.SignIn);
router.post("/signup", authController.SingUp, verifySignUp, validateUser.validateCreate);

export default router;
