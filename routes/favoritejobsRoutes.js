import express from "express";
import {
  addFavoriteJob,
  getFavoritesByUser,
  removeFavoriteJob,
} from "../controllers/favoritesjobController.js";

const router = express.Router();

router.post("/", addFavoriteJob);
router.get("/:email", getFavoritesByUser);
router.delete("/:id", removeFavoriteJob);

export default router;
