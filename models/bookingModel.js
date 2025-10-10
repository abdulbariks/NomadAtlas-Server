import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bookedDate: { type: String, required: true },
  bookedTime: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: 'unpaid' },
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  destination: { type: Object }, // store basic destination info
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
