const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const Destination = require('../models/Destination');
const Experience = require('../models/Experience');
const User = require('../models/User');
const Guide = require('../models/Guide');
const Message = require('../models/Message');
const Booking = require('../models/Booking');

// All admin routes require: valid JWT + admin role
router.use(protect, adminOnly);

// ── STATS ────────────────────────────────────────────────────────────────────
// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [destinations, experiences, users, guides, messages, unreadMessages, bookings, pendingBookings] = await Promise.all([
      Destination.countDocuments(),
      Experience.countDocuments(),
      User.countDocuments(),
      Guide.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Booking.countDocuments(),
      Booking.countDocuments({ paymentStatus: 'pending' }),
    ]);
    const featured = await Destination.countDocuments({ featured: true });
    res.json({ success: true, data: { destinations, experiences, users, featured, guides, messages, unreadMessages, bookings, pendingBookings } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DESTINATIONS ─────────────────────────────────────────────────────────────
// GET /api/admin/destinations
router.get('/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/destinations
router.post('/destinations', async (req, res) => {
  try {
    const dest = await Destination.create(req.body);
    res.status(201).json({ success: true, data: dest });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/destinations/:id
router.put('/destinations/:id', async (req, res) => {
  try {
    const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: dest });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/destinations/:id
router.delete('/destinations/:id', async (req, res) => {
  try {
    const dest = await Destination.findByIdAndDelete(req.params.id);
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── EXPERIENCES ───────────────────────────────────────────────────────────────
// GET /api/admin/experiences
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/experiences
router.post('/experiences', async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/experiences/:id
router.delete('/experiences/:id', async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── USERS ─────────────────────────────────────────────────────────────────────
// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    if (String(req.params.id) === String(req.user._id)) {
      return res.status(400).json({ success: false, message: "You can't delete your own account." });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GUIDES ────────────────────────────────────────────────────────────────────
// GET /api/admin/guides
router.get('/guides', async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json({ success: true, data: guides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/guides
router.post('/guides', async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json({ success: true, data: guide });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/guides/:id
router.put('/guides/:id', async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/guides/:id
router.delete('/guides/:id', async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, message: 'Guide deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── MESSAGES ──────────────────────────────────────────────────────────────────
// GET /api/admin/messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/messages/:id/read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/messages/:id
router.delete('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── BOOKINGS ──────────────────────────────────────────────────────────────────
// GET /api/admin/bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/bookings/:id/confirm
router.put('/bookings/:id/confirm', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: 'confirmed' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/bookings/:id
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
