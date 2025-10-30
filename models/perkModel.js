import mongoose from "mongoose";

const perkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#11c3c0",
  },
  icon: {
    type: String, // store lucide-react icon name (optional)
  },
  details: {
    type: String, // extra description for the individual page
  },
  features: [
    {
      type: String, // list of perk highlights
    },
  ],
  startPrice: {
    type: String, // example: "$10/mo", "$25 once", etc.
  },

  // ✅ Route name for dynamic pages (like /perks/travel-insurance)
  route: {
    type: String,
    unique: true,
  },

  // ✅ External website link (like provider official site)
  url: {
    type: String,
  },
});

const Perk = mongoose.model("Perk", perkSchema);
export default Perk;
