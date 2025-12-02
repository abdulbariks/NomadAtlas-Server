import express from "express";
import { getSuccessStories, createSuccessStory } from "../controllers/successStoriesController.js";

const router = express.Router();

router.get("/", getSuccessStories);
router.post("/", createSuccessStory);

export default router;
