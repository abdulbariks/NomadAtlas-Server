import mongoose from "mongoose";

// City Sub-Schema
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  livingCost: { type: Number, required: true },
  luxuryScore: { type: Number, required: true },

  // Optional fields
  internetSpeed: { type: Number }, // 80 means 80 Mbps
  beachAccess: { type: Boolean }, // true or false
  weather: { type: String }, // "tropical", "moderate", "cold"
  lifestyle: { type: String }, // "tech", "nature", "cultural", "nightlife"
  safetyScore: { type: Number }, // 85 means 85/100
});

// Country Schema
const countrySchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    cities: [citySchema],
  },
  { timestamps: true }
);

//creating model.
const CountryToCalculate = mongoose.model("CountryToCalculate", countrySchema);

export default CountryToCalculate;
