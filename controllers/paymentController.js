import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ 1. Create Payment Intent
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, userId } = req.body;

        if (!amount || !userId) {
            return res.status(400).json({ message: "Missing amount or userId" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // in cents
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        const payment = await Payment.create({
            userId,
            amount,
            paymentIntentId: paymentIntent.id,
            status: "pending",
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


// ✅ 2. Stripe Webhook (update status after payment)
export const handleWebhook = async (req, res) => {
    const event = req.body;

    try {
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            await Payment.findOneAndUpdate(
                { paymentIntentId: paymentIntent.id },
                { status: "succeeded" }
            );
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
        console.error(error.message);
        res.status(500).send("Webhook error");
    }
};


// ✅ 3. Get Payment Data (fetch for user)
export const getPaymentsByUser = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;
        const payments = await Payment.find({ paymentIntentId });
        console.log("payment id", payments)
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch payments" });
    }
};


