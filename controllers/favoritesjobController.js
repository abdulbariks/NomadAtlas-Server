import Favorite from "../models/favoritejobsModel.js";

// ✅ Add a favorite
export const addFavoriteJob = async (req, res) => {
  try {
    const { jobId, userEmail, title, company, category, location } = req.body;
    const existing = await Favorite.findOne({ jobId, userEmail });

    if (existing) return res.status(200).json(existing);

    const newFavorite = new Favorite({ jobId, userEmail, title, company, category, location });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error: error.message });
  }
};

// ✅ Get favorites by user
export const getFavoritesByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const favorites = await Favorite.find({ userEmail: email });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error: error.message });
  }
};

// ✅ Remove favorite
export const removeFavoriteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite", error: error.message });
  }
};
