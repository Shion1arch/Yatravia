const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  role:            { type: String, required: true, default: 'Tour Guide' },
  description:     { type: String, required: true },
  image:           { type: String, required: true },
  experienceYears: { type: Number, required: true },
  languages:       [{ type: String }],
  // Extended profile fields
  location:        { type: String, default: '' },
  phone:           { type: String, default: '' },
  email:           { type: String, default: '' },
  whatsapp:        { type: String, default: '' },
  specialties:     [{ type: String }],
  rating:          { type: Number, default: 5.0, min: 0, max: 5 },
  reviews:         { type: Number, default: 0 },
  createdAt:       { type: Date, default: Date.now },
});

module.exports = mongoose.model('Guide', guideSchema);
