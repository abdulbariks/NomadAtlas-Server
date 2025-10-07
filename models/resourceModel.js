import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["job", "visa", "productivity", "community", "internalTool"],
      required: true,
    },
    name: { type: String, required: true },
    link: { type: String, required: true },
    desc: { type: String },
    logo: { type: String },
    country: { type: String },
    visaType: { type: String },
    duration: { type: String },
    income: { type: String },
    flag: { type: String },
    icon: { type: String },
    color: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
