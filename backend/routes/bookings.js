const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// GET /api/bookings/my — Get logged in user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/bookings — Create a new booking (public, no auth required)
router.post('/', async (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      name,
      email,
      phone,
      travelDate,
      numberOfPeople,
      accommodation,
      specialRequests,
      amount,
    } = req.body;

    const booking = await Booking.create({
      destinationId,
      destinationName,
      name,
      email,
      phone,
      travelDate,
      numberOfPeople,
      accommodation,
      specialRequests,
      amount: amount || 0,
      paymentStatus: 'pending',
    });

    res.status(201).json({
      success: true,
      data: {
        bookingId: booking.bookingId,
        paymentId: booking.paymentId,
        _id: booking._id,
        destinationName: booking.destinationName,
        name: booking.name,
        email: booking.email,
        travelDate: booking.travelDate,
        numberOfPeople: booking.numberOfPeople,
        accommodation: booking.accommodation,
        paymentStatus: booking.paymentStatus,
        createdAt: booking.createdAt,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
