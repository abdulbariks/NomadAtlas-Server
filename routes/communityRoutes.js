import express from "express";
import { getMessages, postMessage, statsHandler, meetupsHandler } from "../controllers/communityController.js";
import {
  getAllPosts,
  getPostById,
  createPost,
  likePost,
  addComment,
  addReply,
} from "../controllers/communityPostsController.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", createPost);
router.post("/posts/:id/like", likePost);
router.post("/posts/:id/comments", addComment);
router.post("/posts/:id/comments/:commentId/replies", addReply);

router.get("/messages", getMessages);
router.post("/messages", postMessage);

router.get("/stats", statsHandler);
router.get("/meetups", meetupsHandler);

export default router;
