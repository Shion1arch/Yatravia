const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const Destination = require('../models/Destination');
const Experience = require('../models/Experience');
const User = require('../models/User');
const Guide = require('../models/Guide');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yatravia';

const destinations = [
  {
    name: 'Living Root Bridges',
    region: 'Khasi Hills',
    description: 'Ancient engineering marvels created by the Khasi tribe — bridges grown from the roots of rubber fig trees over centuries. The trek to the double-decker root bridge at Nongriat is unforgettable.',
    shortDesc: 'Centuries-old natural bridges from living tree roots',
    image: '/images/rootbridge.jpg',
    category: 'Trekking',
    highlights: ['Double-decker bridge', 'Trek through jungle', 'Organic engineering'],
    bestTime: 'October to May',
    featured: true,
  },
  {
    name: 'Nohkalikai Falls',
    region: 'Khasi Hills',
    description: 'One of the tallest plunge waterfalls in India, dropping 340 meters into a stunning turquoise pool surrounded by dense tropical forest.',
    shortDesc: 'India\'s tallest plunge waterfall at 340m',
    image: '/images/waterfall.jpg',
    category: 'Waterfalls',
    highlights: ['340m plunge', 'Turquoise pool', 'Panoramic viewpoint'],
    bestTime: 'October to May',
    featured: true,
  },
  {
    name: 'Mawphanlur',
    region: 'West Khasi Hills',
    description: 'A serene valley village surrounded by rolling green hills and seven peaceful lakes. A perfect escape into the quiet rural life of Meghalaya.',
    shortDesc: 'Serene valley village with seven lakes',
    image: '/images/shillong.jpg',
    category: 'Valley',
    highlights: ['Seven lakes', 'Rolling green hills', 'Stargazing'],
    bestTime: 'September to May',
    featured: true,
  },
  {
    name: 'Laitlum Canyons',
    region: 'East Khasi Hills',
    description: 'Meaning "End of Hills", Laitlum offers breathtaking, sweeping views of plunging gorges, steep winding stairways, and misty valleys.',
    shortDesc: 'Breathtaking gorges and sweeping views',
    image: '/images/hero.jpg',
    category: 'Canyons',
    highlights: ['Plunging gorges', 'Panoramic views', 'Rasong village trek'],
    bestTime: 'September to May',
    featured: true,
  },
  {
    name: 'Dawki River',
    region: 'Jaintia Hills',
    description: 'The Umngot River at Dawki is famous for its crystal-clear water — so transparent that boats appear to float in mid-air.',
    shortDesc: 'Crystal-clear transparent turquoise river',
    image: '/images/dawki.jpg',
    category: 'Rivers',
    highlights: ['Glass-clear water', 'Boat rides', 'Border town'],
    bestTime: 'October to April',
    featured: true,
  },
  {
    name: 'Nartiang Monoliths',
    region: 'Jaintia Hills',
    description: 'The largest collection of megalithic stones in one single area in Meghalaya, erected by the ancient Jaintia Kings to commemorate their victories.',
    shortDesc: 'Ancient megalithic stones of Jaintia Kings',
    image: '/images/festival.jpg',
    category: 'Heritage',
    highlights: ['Tallest monolith (8m)', 'Ancient rituals', 'Historical significance'],
    bestTime: 'Throughout the year',
    featured: false,
  },
  {
    name: 'Nokrek National Park',
    region: 'Garo Hills',
    description: 'A UNESCO Biosphere Reserve, Nokrek is a hotspot of biodiversity, home to the rare red panda and the mother of all citrus fruits, Citrus indica.',
    shortDesc: 'UNESCO Biosphere Reserve with rare wildlife',
    image: '/images/rootbridge.jpg',
    category: 'Wildlife',
    highlights: ['Red Panda spotting', 'Citrus indica sanctuary', 'Biosphere Reserve'],
    bestTime: 'October to May',
    featured: false,
  },
  {
    name: 'Mawsmai Caves',
    region: 'Khasi Hills',
    description: 'A thrilling network of limestone caves illuminated by natural light through narrow openings, filled with dramatic stalactite formations.',
    shortDesc: 'Thrilling limestone cave exploration',
    image: '/images/caves.jpg',
    category: 'Adventure',
    highlights: ['Stalactites & Stalagmites', '150m cave passage', 'Natural light shafts'],
    bestTime: 'October to May',
    featured: true,
  }
];

const experiences = [
  {
    title: 'Nature & Wildlife',
    category: 'Nature & Wildlife',
    description:
      'Explore pristine biodiversity hotspots, sacred groves, national parks, and rare wildlife in the lush forests of Meghalaya.',
    image: '/images/rootbridge.jpg',
    icon: '🌿',
    featured: true,
  },
  {
    title: 'Adventure & Outdoor',
    category: 'Adventure & Outdoor',
    description:
      'Trek through jungles, kayak crystal rivers, rappel into caves, and conquer the rugged terrain of the cloud-capped hills.',
    image: '/images/caves.jpg',
    icon: '⛰️',
    featured: true,
  },
  {
    title: 'Culture & Lifestyle',
    category: 'Culture & Lifestyle',
    description:
      'Immerse yourself in the rich traditions of the Khasi, Jaintia, and Garo tribes — their music, craft, cuisine, and way of life.',
    image: '/images/festival.jpg',
    icon: '🎭',
    featured: true,
  },
  {
    title: 'Festivals & Events',
    category: 'Festivals & Events',
    description:
      'Experience the vibrant energy of Meghalaya through its colorful tribal festivals, music events, and cultural celebrations throughout the year.',
    image: '/images/shillong.jpg',
    icon: '🎪',
    featured: false,
  },
];

const guides = [
  {
    name: 'Rupam Ghosh',
    role: 'Adventure Specialist & Trekking Lead',
    description: 'Rupam is a certified mountaineer and rescue expert with 5 years of experience guiding treks through Mawryngkhang, the double-decker root bridges, and deep canyoning expeditions.',
    image: '/images/guide_rupam.jpg',
    experienceYears: 5,
    languages: ['English', 'Assamese', 'Hindi', 'Khasi'],
    phone: '+91 98765 43210',
    email: 'rupam@yatravia.in',
    whatsapp: '+91 98765 43210',
    location: 'Shillong, Meghalaya',
  },
  {
    name: 'Raktim Ghosh',
    role: 'Senior Tour Guide & Cultural Expert',
    description: 'Raktim has over 6 years of experience leading tours across Meghalaya. He is an expert on tribal culture, local folklore, organic engineering, and photography.',
    image: '/images/guide_raktim.jpg',
    experienceYears: 6,
    languages: ['English', 'Khasi', 'Bengali', 'Hindi'],
    phone: '+91 87654 32109',
    email: 'raktim@yatravia.in',
    whatsapp: '+91 87654 32109',
    location: 'Cherrapunji, Meghalaya',
  }
];

async function seed() {
  try {
    console.log('🔗 Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    await Experience.deleteMany({});
    await User.deleteMany({});
    await Guide.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user (first user auto-gets admin role via the route logic)
    // We set role directly here in seed
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@yatravia.in',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`✅ Created admin user: ${adminUser.email} (password: admin123)`);

    // Insert destinations
    const insertedDests = await Destination.insertMany(destinations);
    console.log(`✅ Seeded ${insertedDests.length} destinations`);

    // Insert experiences
    const insertedExps = await Experience.insertMany(experiences);
    console.log(`✅ Seeded ${insertedExps.length} experiences`);

    // Insert guides
    const insertedGuides = await Guide.insertMany(guides);
    console.log(`✅ Seeded ${insertedGuides.length} guides`);

    console.log('\n🎉 Database seeded successfully!\n');
    console.log('Admin credentials:');
    console.log('  📧 Email:    admin@yatravia.in');
    console.log('  🔑 Password: admin123');
    console.log('\nDestinations:');
    insertedDests.forEach(d => console.log(`  • [${d._id}] ${d.name} (${d.region}) — featured: ${d.featured}`));
    console.log('\nExperiences:');
    insertedExps.forEach(e => console.log(`  • [${e._id}] ${e.title}`));

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
