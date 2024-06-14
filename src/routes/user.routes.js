import * as authController from "../controllers/user.controller.js";
import * as auth from "../middleware/verifyToken.js";
import * as role from "../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get(
  "/users",
  authController.getAll
);
router.get(
  "/users/:id",
  authController.getUserById
);
router.put("/users/:id", authController.updateUserById);
router.delete("/users/:id", authController.deleteUserById);

export default router;

// Integracion permisos
// router.get("/users", auth.verifyToken, authController.getAll);
