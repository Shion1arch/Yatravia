const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// GET /api/contact/my — Get logged in user's messages
router.get('/my', protect, async (req, res) => {
  try {
    const messages = await Message.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    
    // Save message to database
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    console.log('📧 New contact form saved to DB:', { name, email, subject });
    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
