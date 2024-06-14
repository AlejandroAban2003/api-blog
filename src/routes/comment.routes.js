import * as commentController from "../controllers/comment.controller.js";

import { Router } from "express";

const router = Router();

router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getCommentById);
router.post("/comments", commentController.createComment); // Cambio de addComment a createComment
router.put("/comments/:id", commentController.updateCommentById);
router.delete("/comments/:id", commentController.deleteCommentById);

export default router;
