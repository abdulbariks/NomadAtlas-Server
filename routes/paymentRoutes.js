import express from "express";
import { createPaymentIntent, handleWebhook, getPaymentsByUser } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/webhook", express.json({ type: "*/*" }), handleWebhook);
router.get("/:paymentIntentId", getPaymentsByUser);

export default router;
