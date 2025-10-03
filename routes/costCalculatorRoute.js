import express from "express";
import CountryToCalculate from "../models/cityForCostCalculatorModel.js";

import {
  getAllCountries,
  addCountry,
} from "../controllers/costCalculatorController.js";

const router = express.Router();

// all country and cities GET
router.get("/", getAllCountries);

// POST method: adding country and cities
router.post("/", addCountry);

export default router;
