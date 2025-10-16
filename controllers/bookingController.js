import Booking from "../models/bookingModel.js";

// @desc Create a new booking
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

// ✅ @desc Get all bookings
// @route GET /api/bookings
// @access Public or Protected
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ @desc Get a single booking by ID
// @route GET /api/bookings/:id
// @access Public or Protected
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
// @access Public or Protected
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
