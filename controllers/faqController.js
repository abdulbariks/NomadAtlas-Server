import FAQ from "../models/faqModel.js";

// ✅ Get all FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = await FAQ.create({ question, answer });
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFAQ = await FAQ.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFAQ)
      return res.status(404).json({ message: "FAQ not found" });
    res.json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await FAQ.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "FAQ not found" });
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
