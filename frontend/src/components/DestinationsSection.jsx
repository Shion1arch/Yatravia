import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DestinationsSection.css';

const API_URL = import.meta.env.VITE_API_URL;

// Fallback destinations data
const fallbackDestinations = [
  {
    _id: '1',
    name: 'Nohkalikai Falls',
    region: 'Khasi Hills',
    shortDesc: "India's tallest plunge waterfall at 340m",
    image: '/images/waterfall.jpg',
    category: 'Nature',
    bestTime: 'Oct – May',
  },
  {
    _id: '2',
    name: 'Living Root Bridges',
    region: 'Khasi Hills',
    shortDesc: 'Centuries-old natural bridges from living tree roots',
    image: '/images/rootbridge.jpg',
    category: 'Nature',
    bestTime: 'Oct – Jun',
  },
  {
    _id: '3',
    name: 'Shillong',
    region: 'Khasi Hills',
    shortDesc: 'Capital city — Scotland of the East',
    image: '/images/shillong.jpg',
    category: 'Culture',
    bestTime: 'Sep – Jun',
  },
  {
    _id: '4',
    name: 'Dawki River',
    region: 'Khasi Hills',
    shortDesc: 'Crystal-clear transparent turquoise river',
    image: '/images/dawki.jpg',
    category: 'Nature',
    bestTime: 'Oct – May',
  },
];

const categoryColors = {
  Nature: { bg: '#E6EEE9', text: '#294436' },
  Adventure: { bg: '#F1EFEA', text: '#5C544A' },
  Culture: { bg: '#E0DDD8', text: '#1A1A1A' },
  Wildlife: { bg: '#E6EEE9', text: '#1B2E24' },
};

export default function DestinationsSection() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(`${API_URL}/destinations?featured=true`);
        const data = res.data.data;
        setDestinations(data && data.length > 0 ? data : fallbackDestinations);
      } catch {
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const categories = ['All', ...new Set(destinations.map(d => d.category))];
  const filtered = activeFilter === 'All' ? destinations : destinations.filter(d => d.category === activeFilter);

  return (
    <section className="destinations-section" id="destinations-section">
      <div className="container">
        {/* Header */}
        <div className="destinations-section__header">
          <div>
            <span className="badge">✦ Explore Destinations</span>
            <h2 className="section-title destinations-section__title">
              Discover Unique Places
            </h2>
            <p className="section-subtitle">
              Experiences you won't find anywhere else on Earth
            </p>
          </div>
          <Link to="/destinations" className="destinations-section__view-all" id="view-all-destinations">
            View All Destinations →
          </Link>
        </div>

        {/* Category Filters */}
        <div className="destinations-section__filters" role="tablist">
          {categories.map(cat => (
            <button
              key={cat}
              className={`destinations-section__filter ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              role="tab"
              aria-selected={activeFilter === cat}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="destinations-section__loading">
            <div className="spinner" />
          </div>
        ) : (
          <div className="destinations-section__grid">
            {filtered.map((dest, i) => (
              <DestinationCard key={dest._id} dest={dest} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DestinationCard({ dest, index }) {
  const colors = categoryColors[dest.category] || categoryColors.Nature;

  return (
    <Link
      to={`/destinations/${dest._id}`}
      className="dest-card"
      id={`dest-card-${dest._id}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="dest-card__image-wrap">
        <img
          src={dest.image}
          alt={dest.name}
          className="dest-card__image"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'; }}
          loading="lazy"
        />
        <div className="dest-card__overlay" />
        {/* Category Badge */}
        <span
          className="dest-card__category"
          style={{ background: colors.bg, color: colors.text }}
        >
          {dest.category}
        </span>
      </div>

      {/* Info */}
      <div className="dest-card__info">
        <div className="dest-card__region">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {dest.region}
        </div>
        <h3 className="dest-card__name">{dest.name}</h3>
        <p className="dest-card__desc">{dest.shortDesc}</p>
        {dest.bestTime && (
          <div className="dest-card__meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Best: {dest.bestTime}
          </div>
        )}
        <span className="dest-card__arrow">Explore →</span>
      </div>
    </Link>
  );
}
