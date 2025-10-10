import express from "express";
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
} from "../controllers/destinationController.js";

const router = express.Router();

router.post("/", createDestination);
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);

export default router;
