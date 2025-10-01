import PopularDestination from "../models/popularDestinationModel.js";

// ✅ Get all destinations
export const getPopularDestinations = async (req, res, next) => {
  try {
    const destinations = await PopularDestination.find();
    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
};

// ✅ Get single destination by ID
export const getPopularDestinationById = async (req, res, next) => {
  try {
    const destination = await PopularDestination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};

// ✅ Create new destination
export const createPopularDestination = async (req, res, next) => {
  try {
    const { image, title, description } = req.body;

    const destination = await PopularDestination.create({
      image,
      title,
      description,
    });

    res.status(201).json(destination);
  } catch (error) {
    next(error);
  }
};

// ✅ Update destination
export const updatePopularDestination = async (req, res, next) => {
  try {
    const { image, title, description } = req.body;

    const destination = await PopularDestination.findByIdAndUpdate(
      req.params.id,
      { image, title, description },
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};

// ✅ Delete destination
export const deletePopularDestination = async (req, res, next) => {
  try {
    const destination = await PopularDestination.findByIdAndDelete(
      req.params.id
    );

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    next(error);
  }
};
