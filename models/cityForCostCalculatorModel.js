import mongoose from "mongoose";

// City Sub-Schema
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  livingCost: { type: Number, required: true },
  luxuryScore: { type: Number, required: true },
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
