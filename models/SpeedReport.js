import mongoose from "mongoose";

const SpeedReportSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, index: true, trim: true },
    speedMbps: { type: Number, required: true, min: 0 },
    lat: { type: Number },
    lng: { type: Number }
  },
  { timestamps: true }
);

// For faster aggregations by city
SpeedReportSchema.index({ city: 1 });

export const SpeedReport = mongoose.model("SpeedReport", SpeedReportSchema);