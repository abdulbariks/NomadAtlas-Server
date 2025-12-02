import Review from "../models/reviewModel.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { destinationId, user, text, date } = req.body;

    if (!destinationId || !user || !text) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const newReview = await Review.create({ destinationId, user, text, date });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a destination
export const getReviewsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const reviews = await Review.find({ destinationId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
