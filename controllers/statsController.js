import Stats from "../models/StatsModel.js";

export const getStats = async (req, res) => {
  try {
    const stats = await Stats.find();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};
