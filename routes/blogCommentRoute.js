
import express from "express";
import {
  addComment,
  getCommentsByBlog,
  deleteComment,
} from "../controllers/blogCommentController.js";

const router = express.Router();

/**
 * GET /api/comments/:blogId
 * Get all comments for a specific blog
 * Public
 */
router.get("/:blogId", getCommentsByBlog);

/**
 * POST /api/comments/:blogId
 * Add a new comment to a blog
 * Public (or Private if using auth)
 */
router.post("/:blogId", addComment);

/**
 * DELETE /api/comments/:id
 * Delete a comment by ID
 * Admin or Comment Owner
 */
router.delete("/:id", deleteComment);

export default router;
