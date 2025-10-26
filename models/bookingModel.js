import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // User Info
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    userPhone: { type: String, required: true, trim: true },

    // Booking Details
    bookedDate: { type: String, required: true },
    bookedTime: { type: Date, default: Date.now },

    // Payment Info
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded", "cancelled"],
      default: "unpaid",
    },
    paidAt: { type: Date }, // optional: timestamp when payment completed

    // Destination Info
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    title: { type: String },
    city: { type: String },
    country: { type: String },
    continent: { type: String },
    currency: { type: String },
    price: { type: Number },
    providerEmail: { type: String }, // the destination provider (host)
    type: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
