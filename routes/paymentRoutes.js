import express from "express";
import {
  createPaymentIntent,
  handleWebhook,
  getPaymentsByUser,
} from "../controllers/paymentController.js";

const router = express.Router();

// ✅ Create Stripe Payment Intent
router.post("/create-payment-intent", createPaymentIntent);

// ✅ Stripe Webhook to handle payment success/failure
router.post("/webhook", express.json({ type: "*/*" }), handleWebhook);

// ✅ Get payments by PaymentIntentId
router.get("/:bookDestinationId", getPaymentsByUser);

export default router;
