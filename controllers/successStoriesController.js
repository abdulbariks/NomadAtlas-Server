import SuccessStories from "../models/successStoriesModel.js";

// @desc Get all success stories
export const getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStories.find().sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create a new success story
export const createSuccessStory = async (req, res) => {
  try {
    const newStory = await SuccessStories.create(req.body);
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
