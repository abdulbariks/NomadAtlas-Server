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

// PUT: update existing country + cities
export const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, cities } = req.body;

    // Validation
    if (!country || !cities || cities.length === 0) {
      return res.status(400).json({
        message: "Country name and at least one city required",
      });
    }

    // Update
    const updatedCountry = await CountryToCalculate.findByIdAndUpdate(
      id,
      { country, cities },
      { new: true, runValidators: true }
    );

    if (!updatedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    return res.status(200).json(updatedCountry);
  } catch (error) {
    console.error("Error updating country:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE: delete country
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCountry = await CountryToCalculate.findByIdAndDelete(id);

    if (!deletedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    return res.status(200).json({
      message: "Country deleted successfully",
      data: deletedCountry,
    });
  } catch (error) {
    console.error("Error deleting country:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
