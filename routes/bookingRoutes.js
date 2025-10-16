import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByUserEmail,
    updateBookingPayment,
    cancelBooking,
    getBookingsByProviderEmail, // ✅ new controller (fetch by provider email)
    deleteBooking, // ✅ new controller (delete booking)
} from "../controllers/bookingController.js";

const router = express.Router();

// ✅ Create a new booking
router.post("/", createBooking);

// ✅ Get all bookings (admin or general use)
router.get("/", getAllBookings);

// ✅ Get bookings by user email (for user dashboard)
router.get("/user/:email", getBookingsByUserEmail);

// ✅ Get bookings by provider email (for admin/provider dashboard)
router.get("/provider/:email", getBookingsByProviderEmail); // ✅ added

// ✅ Get a single booking by ID
router.get("/:id", getBookingById);

// ✅ Update booking (e.g., payment update)
router.patch("/:id", updateBookingPayment);

// ✅ Cancel a booking (user action)
router.patch("/cancel/:id", cancelBooking);

// ✅ Delete a booking (admin/provider action)
router.delete("/:id", deleteBooking); // ✅ added

export default router;
