import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Destinations.css';

const API_URL = import.meta.env.VITE_API_URL;

const allDestinations = [
  {
    _id: '1',
    name: 'Living Root Bridges',
    region: 'Khasi Hills',
    shortDesc: 'Centuries-old natural bridges from living tree roots',
    description: 'Ancient engineering marvels created by the Khasi tribe — bridges grown from the roots of rubber fig trees over centuries. The trek to the double-decker root bridge at Nongriat is unforgettable.',
    image: '/images/rootbridge.jpg',
    category: 'Trekking',
    highlights: ['Double-decker bridge', 'Trek through jungle', 'Organic engineering'],
    bestTime: 'Oct – May',
    featured: true,
  },
  {
    _id: '2',
    name: 'Nohkalikai Falls',
    region: 'Khasi Hills',
    shortDesc: 'India\'s tallest plunge waterfall at 340m',
    description: 'One of the tallest plunge waterfalls in India, dropping 340 meters into a stunning turquoise pool surrounded by dense tropical forest.',
    image: '/images/waterfall.jpg',
    category: 'Waterfalls',
    highlights: ['340m plunge', 'Turquoise pool', 'Panoramic viewpoint'],
    bestTime: 'Oct – May',
    featured: true,
  },
  {
    _id: '3',
    name: 'Mawphanlur',
    region: 'West Khasi Hills',
    shortDesc: 'Serene valley village with seven lakes',
    description: 'A serene valley village surrounded by rolling green hills and seven peaceful lakes. A perfect escape into the quiet rural life of Meghalaya.',
    image: '/images/shillong.jpg',
    category: 'Valley',
    highlights: ['Seven lakes', 'Rolling green hills', 'Stargazing'],
    bestTime: 'Sep – May',
    featured: true,
  },
  {
    _id: '4',
    name: 'Laitlum Canyons',
    region: 'East Khasi Hills',
    shortDesc: 'Breathtaking gorges and sweeping views',
    description: 'Meaning "End of Hills", Laitlum offers breathtaking, sweeping views of plunging gorges, steep winding stairways, and misty valleys.',
    image: '/images/hero.jpg',
    category: 'Canyons',
    highlights: ['Plunging gorges', 'Panoramic views', 'Rasong village trek'],
    bestTime: 'Sep – May',
    featured: true,
  },
  {
    _id: '5',
    name: 'Dawki River',
    region: 'Jaintia Hills',
    shortDesc: 'Crystal-clear transparent turquoise river',
    description: 'The Umngot River at Dawki is famous for its crystal-clear water — so transparent that boats appear to float in mid-air.',
    image: '/images/dawki.jpg',
    category: 'Rivers',
    highlights: ['Glass-clear water', 'Boat rides', 'Border town'],
    bestTime: 'Oct – Apr',
    featured: true,
  },
  {
    _id: '6',
    name: 'Nartiang Monoliths',
    region: 'Jaintia Hills',
    shortDesc: 'Ancient megalithic stones of Jaintia Kings',
    description: 'The largest collection of megalithic stones in one single area in Meghalaya, erected by the ancient Jaintia Kings to commemorate their victories.',
    image: '/images/festival.jpg',
    category: 'Heritage',
    highlights: ['Tallest monolith (8m)', 'Ancient rituals', 'Historical significance'],
    bestTime: 'All year',
    featured: false,
  },
  {
    _id: '7',
    name: 'Nokrek National Park',
    region: 'Garo Hills',
    shortDesc: 'UNESCO Biosphere Reserve with rare wildlife',
    description: 'A UNESCO Biosphere Reserve, Nokrek is a hotspot of biodiversity, home to the rare red panda and the mother of all citrus fruits, Citrus indica.',
    image: '/images/rootbridge.jpg',
    category: 'Wildlife',
    highlights: ['Red Panda spotting', 'Citrus indica sanctuary', 'Biosphere Reserve'],
    bestTime: 'Oct – May',
    featured: false,
  },
  {
    _id: '8',
    name: 'Mawsmai Caves',
    region: 'Khasi Hills',
    shortDesc: 'Thrilling limestone cave exploration',
    description: 'A thrilling network of limestone caves illuminated by natural light through narrow openings, filled with dramatic stalactite formations.',
    image: '/images/caves.jpg',
    category: 'Adventure',
    highlights: ['Stalactites & Stalagmites', '150m cave passage', 'Natural light shafts'],
    bestTime: 'Oct – May',
    featured: true,
  }
];

const categories = ['All', 'Trekking', 'Waterfalls', 'Valley', 'Canyons', 'Rivers', 'Heritage', 'Wildlife', 'Adventure'];

const categoryColors = {
  Trekking:  { bg: '#E6EEE9', text: '#294436' },
  Waterfalls:{ bg: '#F1EFEA', text: '#5C544A' },
  Valley:    { bg: '#E6EEE9', text: '#294436' },
  Canyons:   { bg: '#E0DDD8', text: '#1A1A1A' },
  Rivers:    { bg: '#F1EFEA', text: '#5C544A' },
  Heritage:  { bg: '#E0DDD8', text: '#1A1A1A' },
  Wildlife:  { bg: '#E6EEE9', text: '#1B2E24' },
  Adventure: { bg: '#F1EFEA', text: '#5C544A' },
};

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_URL}/destinations`);
        setDestinations(res.data.data?.length ? res.data.data : allDestinations);
      } catch {
        setDestinations(allDestinations);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = destinations.filter(d => {
    const matchCat = catFilter === 'All' || d.category === catFilter;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.shortDesc?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="destinations-page">
      {/* Page Hero */}
      <div className="destinations-page__hero">
        <div className="destinations-page__hero-bg" style={{ backgroundImage: "url('/images/bg_nature_waterfall.png')" }} />
        <div className="destinations-page__hero-overlay" />
        <div className="container">
          <div className="destinations-page__hero-content">
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>
              ✦ Explore Destinations
            </span>
            <h1 className="destinations-page__hero-title">All Destinations</h1>
            <p className="destinations-page__hero-sub">
              Discover every corner of the Land of Clouds
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="destinations-page__filters-wrap">
        <div className="container">
          <div className="destinations-page__filters">
            {/* Search */}
            <div className="destinations-page__search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="destinations-page__search-input"
                id="destinations-search"
                aria-label="Search destinations"
              />
            </div>

            {/* Category Filter */}
            <div className="destinations-page__filter-group">
              <span className="destinations-page__filter-label">Category:</span>
              {categories.map(c => (
                <button
                  key={c}
                  className={`destinations-page__filter-btn ${catFilter === c ? 'active' : ''}`}
                  onClick={() => setCatFilter(c)}
                  id={`category-${c.toLowerCase()}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="destinations-page__content">
        <div className="container">
          <div className="destinations-page__count">
            {loading ? 'Loading...' : `${filtered.length} destination${filtered.length !== 1 ? 's' : ''} found`}
          </div>

          {loading ? (
            <div className="destinations-page__loading">
              <div className="spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="destinations-page__empty">
              <div className="destinations-page__empty-icon">🗺️</div>
              <h3>No destinations found</h3>
              <p>Try adjusting your search or filters</p>
              <button onClick={() => { setCatFilter('All'); setSearch(''); }}
                className="btn-primary" style={{ marginTop: 16 }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="destinations-page__grid">
              {filtered.map((dest, i) => (
                <Link
                  key={dest._id}
                  to={`/destinations/${dest._id}`}
                  className="dest-card-lg"
                  id={`dest-${dest._id}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="dest-card-lg__image-wrap">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="dest-card-lg__image"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'; }}
                      loading="lazy"
                    />
                    <div className="dest-card-lg__overlay" />
                    <span
                      className="dest-card-lg__category"
                      style={{ background: categoryColors[dest.category]?.bg || '#E6F2FA', color: categoryColors[dest.category]?.text || '#1A3D5E' }}
                    >
                      {dest.category}
                    </span>
                    {dest.featured && <span className="dest-card-lg__featured">⭐ Featured</span>}
                  </div>
                  <div className="dest-card-lg__info">
                    <div className="dest-card-lg__region">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {dest.region}
                    </div>
                    <h2 className="dest-card-lg__name">{dest.name}</h2>
                    <p className="dest-card-lg__desc">{dest.shortDesc || dest.description?.slice(0, 90) + '...'}</p>
                    {dest.bestTime && (
                      <div className="dest-card-lg__meta">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Best Time: {dest.bestTime}
                      </div>
                    )}
                    <div className="dest-card-lg__cta">Explore →</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
