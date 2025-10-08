import mongoose from "mongoose";

const popularDestinationSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

const PopularDestination = mongoose.model(
  "PopularDestination",
  popularDestinationSchema
);

export default PopularDestination;
