import Newsletter from "../models/newsletterModel.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required." });

    const existing = await Newsletter.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "You're already subscribed!" });

    await Newsletter.create({ email });
    res.status(201).json({ message: "🎉 Subscribed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
