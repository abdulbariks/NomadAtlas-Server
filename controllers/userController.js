import User from "../models/userModel.js";

// register user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, photoURL, role } = req.body;

    // const userExists = await User.findOne({ email });
    // if (userExists)
    //   return res.status(400).json({ message: "User already exists" });

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      // user.last_log_in = last_log_in || new Date()
      // await user.save()
      return res.status(200).json(user);
    } else {
      const user = await User.create({
        name,
        email,
        photoURL,
        role
      });
      return res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

// login user
export const loginUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.last_log_in = new Date();
    await user.save()
    return res.status(200).json(user);
  } catch (error) {
    next(error)
  }
}

//  Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by email
export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};



// role Check
export const checkUserRole = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ role: user.role || "user" })
  } catch (err) {
    console.error("Error checking role:", err);
    res.status(500).json({ message: "Server error" });
  }
}


