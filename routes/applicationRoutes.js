import express from "express";
import { createApplication, getApplicationsByJob, getApplicationsByUser, upload } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", upload.single("image"), createApplication);
router.get("/job/:jobId", getApplicationsByJob);
router.get("/user/:email", getApplicationsByUser);

export default router;
