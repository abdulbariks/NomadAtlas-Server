import express from "express";
import {
  addComment,
  getCommentsByBlog,
  deleteComment,
} from "../controllers/blogComment.js";

const router = express.Router();

// GET all comments for a specific blog
router.get("/:blogId", getCommentsByBlog);

// POST new comment
router.post("/:blogId", addComment);

// DELETE comment (optional, admin use)
router.delete("/:id", deleteComment);

export default router;
