import Perk from "../models/perkModel.js";

// GET all perks
export const getAllPerks = async (req, res) => {
  try {
    const perks = await Perk.find();
    res.status(200).json(perks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one perk by ID or route
export const getPerkById = async (req, res) => {
  try {
    const perk = await Perk.findById(req.params.id);
    if (!perk) return res.status(404).json({ message: "Perk not found" });
    res.status(200).json(perk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new perk (optional for seeding)
export const createPerk = async (req, res) => {
  try {
    const newPerk = new Perk(req.body);
    const saved = await newPerk.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
