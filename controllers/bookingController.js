import Booking from "../models/bookingModel.js";
import mongoose from "mongoose";

// ✅ @desc Create a new booking
// @route POST /api/bookings
// @access Public
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ @desc Get all bookings (Admin view)
// @route GET /api/bookings
// @access Admin or Protected
export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    // Optional filtering by payment status (e.g., ?status=paid)
    if (status) filter.paymentStatus = status;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ @desc Get bookings by user email (User dashboard view)
// @route GET /api/bookings/user/:email?status=paid
// @access Protected (based on your auth logic)
export const getBookingsByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { status } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "User email is required" });
    }

    const filter = { userEmail: email };

    // Optional filter by paymentStatus (like ?status=paid)
    if (status) {
      filter.paymentStatus = status;
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ @desc Get a single booking by ID
// @route GET /api/bookings/:id
// @access Protected
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ @desc Update booking payment status
// @route PATCH /api/bookings/:id
// @access Protected
export const updateBookingPayment = async (req, res) => {
  try {
    const { paymentStatus, paidAt } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, paidAt },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking payment updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ @desc Cancel booking (user action)
// @route PATCH /api/bookings/cancel/:id
// @access Protected

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);
    console.log("booking", booking);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ success: false, message: "Cannot cancel a paid booking" });
    }

    booking.paymentStatus = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error); // <--- log the real error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

