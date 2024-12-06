import { Router } from "express";
import { PostController } from "../controller/PostController";
const router = Router();
router.get("/posts", PostController.getAllPosts);
export default router;
