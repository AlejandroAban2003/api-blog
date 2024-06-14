import * as roleController from "../controllers/role.controller.js";
import { Router } from "express";

const router = Router();

router.get("/roles", roleController.getAllRoles);
router.get("/role/:id", roleController.getRoleById);

export default router;
