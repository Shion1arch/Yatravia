const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['Nature & Wildlife', 'Adventure & Outdoor', 'Culture & Lifestyle', 'Festivals & Events'] },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Experience', experienceSchema);
