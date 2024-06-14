import * as postController from "../controllers/post.controller.js";
import { Router } from "express";
const router = Router();

router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getPostById);
router.post("/posts", postController.createPost);
router.put("/posts/:id", postController.updatePostById);
router.delete("/posts/:id", postController.deletePostById);

export default router;
