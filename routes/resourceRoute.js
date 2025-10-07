import express from "express";
import resourceController from "../controllers/resourceController.js";

const router = express.Router();

router.post("/", resourceController.createResource);
router.get("/", resourceController.getAllResources);

export default router;
