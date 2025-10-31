import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cost: { type: String, default: "" },
  wifi: { type: String, default: "" },
  safety: { type: String, default: "" },
  climate: { type: String, default: "" },
  coworking: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const City = mongoose.models.City || mongoose.model("City", CitySchema);
export default City;