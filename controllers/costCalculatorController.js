import CountryToCalculate from "../models/cityForCostCalculatorModel.js";

// GET: all countries + cities
export const getAllCountries = async (req, res) => {
  try {
    const data = await CountryToCalculate.find();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST: add new country + cities
export const addCountry = async (req, res) => {
  try {
    const newCountry = await CountryToCalculate.create(req.body);
    return res.status(201).json(newCountry);
  } catch (error) {
    console.error("Error creating data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
