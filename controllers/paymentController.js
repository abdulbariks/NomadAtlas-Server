import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
import Booking from "../models/bookingModel.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1. Create Payment Intent
export const createPaymentIntent = async (req, res) => {
    try {
        const { paidAmount, bookDestinationId } = req.body; // match frontend

        if (!paidAmount || !bookDestinationId) {
            return res.status(400).json({ message: "Missing paidAmount or booking ID" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: paidAmount * 100, // in cents
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        const payment = await Payment.create({
            bookDestinationId: bookDestinationId, // link to booking
            amount: paidAmount,
            currency: "usd",
            paymentIntentId: paymentIntent.id,
            status: "paid",
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentId: payment._id,
        });
    } catch (error) {
        console.error("Payment creation failed:", error.message);
        res.status(500).json({ message: "Payment initiation failed" });
    }
};

// 2. Stripe Webhook (update payment & booking after success)
export const handleWebhook = async (req, res) => {
    const event = req.body;

    try {
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;

            // Update payment status
            const payment = await Payment.findOneAndUpdate(
                { paymentIntentId: paymentIntent.id },
                { status: "succeeded" },
                { new: true }
            );

            if (payment) {
                // Update corresponding booking
                await Booking.findByIdAndUpdate(
                    payment.userId,
                    {
                        paymentStatus: "paid",
                        paidAt: new Date(paymentIntent.created * 1000),
                    },
                    { new: true }
                );
            }
        }

        if (event.type === "payment_intent.payment_failed") {
            const paymentIntent = event.data.object;
            await Payment.findOneAndUpdate(
                { paymentIntentId: paymentIntent.id },
                { status: "failed" }
            );
        }

        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(500).send("Webhook error");
    }
};

// 3. Get Payment Data (fetch by paymentIntentId)
export const getPaymentsByUser = async (req, res) => {
    try {
        const { bookDestinationId } = req.params;
        const payments = await Payment.find({ bookDestinationId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch payments" });
    }
};


// ✅ 4. Get All Payment History
export const getAllPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find({})
            .sort({ createdAt: -1 }) // latest first
            .populate('bookDestinationId'); // optional: populate booking details if needed

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        console.error("Failed to fetch payment history:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch payment history"
        });
    }
};
