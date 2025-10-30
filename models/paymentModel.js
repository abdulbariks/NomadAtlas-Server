import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookDestinationId: { type: String, required: true }, // Reference to the booking
    amount: { type: Number, required: true }, // Paid amount
    currency: { type: String, default: "USD" }, // Currency
    paymentIntentId: { type: String, required: true }, // Stripe Payment Intent ID
    status: { type: String, default: "pending" }, // pending | succeeded | failed
    paidAt: { type: Date }, // Timestamp of successful payment
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
