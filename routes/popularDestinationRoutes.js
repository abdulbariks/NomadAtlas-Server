import express from "express";
import {
  getPopularDestinations,
  getPopularDestinationById,
  createPopularDestination,
  updatePopularDestination,
  deletePopularDestination,
} from "../controllers/popularDestinationController.js";

const router = express.Router();

router.get("/", getPopularDestinations);
router.get("/:id", getPopularDestinationById);
router.post("/", createPopularDestination);
router.put("/:id", updatePopularDestination);
router.delete("/:id", deletePopularDestination);
 
export default router;
