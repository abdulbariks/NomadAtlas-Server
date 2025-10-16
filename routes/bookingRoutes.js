import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByUserEmail,
    updateBookingPayment,
    cancelBooking, // ✅ keep this (exists in your controller)
} from "../controllers/bookingController.js";

const router = express.Router();

// ✅ Create a new booking
router.post("/", createBooking);

// ✅ Get all bookings (admin or general use)
router.get("/", getAllBookings);

// ✅ Get bookings by user email (for user dashboard)
router.get("/user/:email", getBookingsByUserEmail);

// ✅ Get a single booking by ID
router.get("/:id", getBookingById);

// ✅ Update booking (e.g., payment update)
router.patch("/:id", updateBookingPayment);

// ✅ Cancel a booking (user action)
router.patch("/cancel/:id", cancelBooking);

export default router;
