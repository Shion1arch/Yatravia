const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Static fallback data
const staticDestinations = [
  {
    _id: '1',
    name: 'Nohkalikai Falls',
    region: 'Khasi Hills',
    description: 'One of the tallest plunge waterfalls in India, dropping 340 meters into a stunning turquoise pool surrounded by dense tropical forest.',
    shortDesc: 'India\'s tallest plunge waterfall at 340m',
    image: '/images/waterfall.jpg',
    category: 'Nature',
    highlights: ['340m drop', 'Turquoise pool', 'Scenic viewpoint'],
    bestTime: 'October to May',
    featured: true,
  },
  {
    _id: '2',
    name: 'Living Root Bridges',
    region: 'Khasi Hills',
    description: 'Ancient engineering marvels created by the Khasi tribe — bridges grown from the roots of rubber fig trees over centuries.',
    shortDesc: 'Centuries-old natural bridges from living tree roots',
    image: '/images/rootbridge.jpg',
    category: 'Nature',
    highlights: ['Double-decker bridge', 'Trek through jungle', 'UNESCO potential site'],
    bestTime: 'October to June',
    featured: true,
  },
  {
    _id: '3',
    name: 'Shillong',
    region: 'Khasi Hills',
    description: 'The "Scotland of the East" — a charming hill station with colonial architecture, vibrant music scene, stunning lakes, and misty valleys.',
    shortDesc: 'Capital city — Scotland of the East',
    image: '/images/shillong.jpg',
    category: 'Culture',
    highlights: ['Ward\'s Lake', 'Don Bosco Museum', 'Police Bazaar', 'Golf course'],
    bestTime: 'September to June',
    featured: true,
  },
  {
    _id: '4',
    name: 'Dawki River',
    region: 'Khasi Hills',
    description: 'The crystal-clear Umngot River where boats appear to float in mid-air on the transparent turquoise waters flowing along the Bangladesh border.',
    shortDesc: 'Crystal-clear river with glass-like transparent water',
    image: '/images/dawki.jpg',
    category: 'Nature',
    highlights: ['Boat rides', 'Crystal clear water', 'Border town charm'],
    bestTime: 'October to May',
    featured: true,
  },
  {
    _id: '5',
    name: 'Mawsmai Caves',
    region: 'Khasi Hills',
    description: 'A network of magnificent limestone caves with dramatic stalactite and stalagmite formations, illuminated by natural and artificial light.',
    shortDesc: 'Dramatic limestone cave formations',
    image: '/images/caves.jpg',
    category: 'Adventure',
    highlights: ['Limestone formations', 'Cave exploration', 'Natural light shafts'],
    bestTime: 'October to May',
    featured: false,
  },
  {
    _id: '6',
    name: 'Mawsynram',
    region: 'Khasi Hills',
    description: 'The wettest place on Earth — a mystical village shrouded in mist and cascading waterfalls, receiving over 11,000mm of rain annually.',
    shortDesc: 'Wettest place on Earth — 11,000mm annual rainfall',
    image: '/images/hero.jpg',
    category: 'Nature',
    highlights: ['Record rainfall', 'Mawjymbuin Cave', 'Misty landscapes'],
    bestTime: 'June to September',
    featured: false,
  },
];

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const { region, category, featured } = req.query;
    let query = {};
    if (region) query.region = region;
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: destinations });
  } catch (error) {
    // Return static data if MongoDB unavailable
    let data = staticDestinations;
    if (req.query.featured === 'true') data = data.filter(d => d.featured);
    res.json({ success: true, data, source: 'static' });
  }
});

// GET single destination
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      const found = staticDestinations.find(d => d._id === req.params.id);
      if (!found) return res.status(404).json({ success: false, message: 'Destination not found' });
      return res.json({ success: true, data: found });
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    const found = staticDestinations.find(d => d._id === req.params.id);
    if (!found) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: found });
  }
});

// POST create destination
router.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json({ success: true, data: destination });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
