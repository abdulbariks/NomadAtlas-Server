import mongoose from "mongoose";

const favoriteJobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true },
    userEmail: { type: String, required: true },
    title: String,
    company: String,
    category: String,
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("FavoriteJob", favoriteJobSchema);
