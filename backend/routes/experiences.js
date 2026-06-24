const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

const staticExperiences = [
  {
    _id: '1',
    title: 'Nature & Wildlife',
    category: 'Nature & Wildlife',
    description: 'Explore pristine biodiversity hotspots, sacred groves, national parks, and rare wildlife in the lush forests of Meghalaya.',
    image: '/images/rootbridge.jpg',
    icon: '🌿',
    featured: true,
  },
  {
    _id: '2',
    title: 'Adventure & Outdoor',
    category: 'Adventure & Outdoor',
    description: 'Trek through jungles, kayak crystal rivers, rappel into caves, and conquer the rugged terrain of the cloud-capped hills.',
    image: '/images/caves.jpg',
    icon: '⛰️',
    featured: true,
  },
  {
    _id: '3',
    title: 'Culture & Lifestyle',
    category: 'Culture & Lifestyle',
    description: 'Immerse yourself in the rich traditions of the Khasi, Jaintia, and Garo tribes — their music, craft, cuisine, and way of life.',
    image: '/images/festival.jpg',
    icon: '🎭',
    featured: true,
  },
];

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.json({ success: true, data: staticExperiences, source: 'static' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      const found = staticExperiences.find(e => e._id === req.params.id);
      if (!found) return res.status(404).json({ success: false, message: 'Experience not found' });
      return res.json({ success: true, data: found });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    const found = staticExperiences.find(e => e._id === req.params.id);
    if (!found) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: found });
  }
});

module.exports = router;
