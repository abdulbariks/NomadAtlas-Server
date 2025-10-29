import mongoose from "mongoose";

const successStoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    tag: { type: String, required: true },
    image: { type: String, default: "https://i.pravatar.cc/100" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const SuccessStories = mongoose.model("SuccessStories", successStoriesSchema);
export default SuccessStories;
