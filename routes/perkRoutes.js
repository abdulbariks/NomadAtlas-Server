import express from "express";
import { getAllPerks, getPerkById, } from "../controllers/perkController.js";

const router = express.Router();

router.get("/", getAllPerks);
router.get("/:id", getPerkById);
// optional



export default router;
