import express from "express";
import { registerUser } from "../controllers/userController.js";
import { createBlog } from "../controllers/blogController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/", createBlog);

export default router;
