import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    jobType: { type: String, required: true }, // Full Time / Part Time / Remote
    minSalary: { type: Number },
    maxSalary: { type: Number },
    currency: { type: String, default: "USD" },
    location: { type: String, required: true },
    applicationUrl: { type: String, required: true },
    skills: { type: [String] },
    requirements: { type: [String], required: true },  // ✅ Array field
    benefits: { type: [String], required: true },
    postedTime: { type: Date, default: Date.now },  // When job is posted or made available
    lastDate: { type: Date, required: true },        // ✅ Array field
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
