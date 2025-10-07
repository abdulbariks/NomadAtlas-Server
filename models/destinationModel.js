import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String },
    type: { type: String },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    description: { type: String, required: true },
    avgLivingCost: { type: Number, required: true },
    pricePerMonth: { type: Number },
    priceRange: { type: String },
    bookingLink: { type: String },
    totalSeat: { type: Number },
    currency: { type: String, required: true },
    wifiSpeed: { type: Number, required: true },
    coworkingSpaces: { type: Number, default: 0 },
    safetyIndex: { type: Number, default: 0 },
    safety: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    climate: {
      temperature: { type: Number },
      humidity: { type: Number },
      seasonBest: { type: String },
      type: {
        type: String,
        enum: ["Mediterranean", "Tropical", "Spring-like", "Temperate", "Arid"],
      },
    },
    visaInfo: {
      visaType: { type: String },
      visaDuration: { type: String },
    },
    amenities: {
      wifi: { type: Boolean, default: false },
      kitchen: { type: Boolean, default: false },
      ac: { type: Boolean, default: false },
      workspace: { type: Boolean, default: false },
    },
    wifi: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    workspace: { type: Boolean, default: false },
    image: { type: String },
    images: [{ type: String }],
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
