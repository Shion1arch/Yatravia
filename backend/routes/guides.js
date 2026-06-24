const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');

// GET /api/guides — Fetch all guides
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json({ success: true, data: guides });
  } catch (err) {
    console.error('Error fetching guides:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
