import express from "express";
import { listCities, getCity, createCity, deleteCity } from "../controllers/cityController.js";
const router = express.Router();

router.get("/", listCities);
router.get("/:id", getCity);
router.post("/", createCity);
router.delete("/:id", deleteCity);

export default router;
