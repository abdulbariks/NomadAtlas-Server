import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  icon: String,
  value: Number,
  suffix: String,
  label: String,
});

const Stats = mongoose.model("Stats", statsSchema);
export default Stats;
