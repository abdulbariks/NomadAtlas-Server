import Application from "../models/applicationModel.js";
import Job from "../models/job.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/applications";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// Create Application
export const createApplication = async (req, res) => {
  try {
    const { jobId, applicantEmail, message } = req.body;
    const imageUrl = req.file ? `/uploads/applications/${req.file.filename}` : null;

    // ensure job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const newApp = await Application.create({
      jobId,
      applicantEmail,
      message,
      imageUrl,
    });

    res.status(201).json({ success: true, application: newApp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all applications for a specific job (Admin/Company can see)
export const getApplicationsByJob = async (req, res) => {
  try {
    const apps = await Application.find({ jobId: req.params.jobId }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all applications by a user
export const getApplicationsByUser = async (req, res) => {
  try {
    const apps = await Application.find({ applicantEmail: req.params.email });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
