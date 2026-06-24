const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: true },
  shortDesc: { type: String },
  image: { type: String, required: true },
  category: { type: String },
  highlights: [String],
  bestTime: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Destination', destinationSchema);
