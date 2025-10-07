import Resource from "../models/resourceModel.js"; // .js লাগবেই এখানে!

const createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json({ success: true, resource });
  } catch (err) {
    console.error("Error creating resource:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json({ success: true, resources });
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export default { createResource, getAllResources };
