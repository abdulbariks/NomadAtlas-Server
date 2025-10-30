import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String }, 
    backgroundImage: { type: String }, 
    role: { type: String, default: "user" },
    status: { type: String }, // Position/Title
    about: { type: String },
    phone: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;