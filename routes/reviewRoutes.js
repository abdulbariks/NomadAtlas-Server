import express from "express";
import {
  createReview,
  getReviewsByDestination,
  getAllReviews,

} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:destinationId", getReviewsByDestination);

export default router;
