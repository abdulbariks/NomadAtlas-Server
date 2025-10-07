import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    text: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
