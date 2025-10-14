import { Router } from "express";
import { getAverageSpeeds, postSpeedReport, getReportsByCity } from "../controllers/internetSpeedController.js";

const router = Router();

router.get("/average", getAverageSpeeds);
router.post("/report", postSpeedReport);
router.get("/reports/:city", getReportsByCity);

export default router;