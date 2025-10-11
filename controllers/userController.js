import User from "../models/userModel.js";
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, image, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, image, role });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
