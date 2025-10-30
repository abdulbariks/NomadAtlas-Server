import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: "Message received!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
