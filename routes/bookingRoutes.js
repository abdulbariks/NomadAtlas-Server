import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingPayment,  // ✅ new controller
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getAllBookings);

// Get a single booking by ID
router.get("/:id", getBookingById);

// Update booking (e.g., after successful payment)
router.patch("/:id", updateBookingPayment, );

export default router;
