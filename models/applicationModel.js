// models/application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicantEmail: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String }, // optional uploaded file URL
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
