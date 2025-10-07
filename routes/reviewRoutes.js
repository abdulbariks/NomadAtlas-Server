import express from "express";
import {
  createReview,
  getReviewsByDestination,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/:destinationId", getReviewsByDestination);

export default router;
