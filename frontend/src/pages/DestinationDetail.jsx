import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DestinationDetail.css';
import PlanTripModal from '../components/PlanTripModal';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

// Static fallback — only used if the API is completely unreachable
const staticDestinations = [
  {
    _id: '1', name: 'Nohkalikai Falls', region: 'Khasi Hills',
    shortDesc: "India's tallest plunge waterfall at 340m",
    description: 'One of the tallest plunge waterfalls in India, Nohkalikai plunges 340 metres into a breathtaking turquoise pool. The name "Nohkalikai" translates to "Jump of Ka Likai" — a poignant Khasi legend. The falls are most spectacular during the monsoon season and early winter.',
    image: '/images/waterfall.jpg', category: 'Nature',
    highlights: ['340m sheer plunge', 'Turquoise-green pool', 'Panoramic viewpoint', 'Nearby Cherrapunji'],
    bestTime: 'October to May',
  },
  {
    _id: '2', name: 'Living Root Bridges', region: 'Khasi Hills',
    shortDesc: 'Centuries-old natural bridges from living tree roots',
    description: 'The living root bridges of Meghalaya are a testament to the ingenuity of the Khasi tribe. Grown over 15-30 years by training the roots of Ficus elastica trees, these bridges are stronger the older they get.',
    image: '/images/rootbridge.jpg', category: 'Nature',
    highlights: ['Double-decker bridge', 'Trek through jungle', 'UNESCO potential site', 'Organic engineering'],
    bestTime: 'October to June',
  },
  {
    _id: '3', name: 'Shillong', region: 'Khasi Hills',
    shortDesc: "Capital city — Scotland of the East",
    description: "Shillong, the capital of Meghalaya, is often called the 'Scotland of the East' for its rolling hills and pleasant climate.",
    image: '/images/shillong.jpg', category: 'Culture',
    highlights: ["Ward's Lake", 'Don Bosco Museum', 'Police Bazaar'],
    bestTime: 'September to June',
  },
  {
    _id: '4', name: 'Dawki River', region: 'Khasi Hills',
    shortDesc: 'Crystal-clear transparent turquoise river',
    description: "The Umngot River at Dawki is famous for its crystal-clear water — so transparent that boats appear to float in mid-air.",
    image: '/images/dawki.jpg', category: 'Nature',
    highlights: ['Glass-clear water', 'Boat rides', 'Suspension bridge'],
    bestTime: 'October to May',
  },
  {
    _id: '5', name: 'Mawsmai Caves', region: 'Khasi Hills',
    shortDesc: 'Dramatic limestone cave formations',
    description: 'The Mawsmai Caves near Cherrapunji are a network of limestone caves with stunning stalactites and stalagmites.',
    image: '/images/caves.jpg', category: 'Adventure',
    highlights: ['Stalactites & Stalagmites', '150m cave passage', 'Natural light shafts'],
    bestTime: 'October to May',
  },
  {
    _id: '6', name: 'Mawsynram', region: 'Khasi Hills',
    shortDesc: 'Wettest place on Earth — 11,000mm annual rainfall',
    description: "Mawsynram holds the Guinness World Record as the wettest place on Earth, receiving over 11,872mm of annual rainfall.",
    image: '/images/hero.jpg', category: 'Nature',
    highlights: ['World Record rainfall', 'Mawjymbuin Cave', 'Perpetual mist'],
    bestTime: 'June to September (peak), October to May',
  },
];

export default function DestinationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dest, setDest] = useState(null);
  const [allDests, setAllDests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchAll = async () => {
      try {
        // Fetch both in parallel
        const [destRes, allRes] = await Promise.all([
          axios.get(`${API_URL}/destinations/${id}`),
          axios.get(`${API_URL}/destinations`),
        ]);
        setDest(destRes.data.data);
        setAllDests(allRes.data.data?.length > 0 ? allRes.data.data : staticDestinations);
      } catch {
        // Full fallback
        const found = staticDestinations.find(d => d._id === id);
        setDest(found || null);
        setAllDests(staticDestinations);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const relatedDests = allDests.filter(d => String(d._id) !== String(id)).slice(0, 3);

  if (loading) return (
    <div className="detail-loading">
      <div className="spinner" />
    </div>
  );

  if (!dest) return (
    <div className="detail-not-found">
      <div style={{ fontSize: '4rem' }}>🗺️</div>
      <h2>Destination Not Found</h2>
      <Link to="/destinations" className="btn-primary" style={{ marginTop: 16 }}>
        ← Back to Destinations
      </Link>
    </div>
  );

  return (
    <div className="detail-page">
      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-hero__bg" style={{ backgroundImage: `url('${dest.image}')` }} />
        <div className="detail-hero__overlay" />
        <div className="container">
          <div className="detail-hero__content">
            <Link to="/destinations" className="detail-back">
              ← All Destinations
            </Link>
            <div className="detail-hero__region">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {dest.region}
            </div>
            <h1 className="detail-hero__title">{dest.name}</h1>
            <p className="detail-hero__sub">{dest.shortDesc}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        <div className="container">
          <div className="detail-content__grid">
            {/* Main */}
            <div className="detail-main">
              <h2 className="detail-section-title">About {dest.name}</h2>
              <p className="detail-description">{dest.description}</p>

              {dest.highlights?.length > 0 && (
                <div className="detail-highlights">
                  <h3 className="detail-highlights-title">Highlights</h3>
                  <div className="detail-highlights-grid">
                    {dest.highlights.map(h => (
                      <div key={h} className="detail-highlight-item">
                        <div className="detail-highlight-dot" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="detail-info-card">
                <h3 className="detail-info-card__title">Quick Info</h3>
                <div className="detail-info-item">
                  <span className="detail-info-label">Region</span>
                  <span className="detail-info-value">{dest.region}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Category</span>
                  <span className="detail-info-value detail-info-badge">{dest.category}</span>
                </div>
                {dest.bestTime && (
                  <div className="detail-info-item">
                    <span className="detail-info-label">Best Time</span>
                    <span className="detail-info-value">{dest.bestTime}</span>
                  </div>
                )}
                <button
                  className="detail-plan-btn"
                  id="detail-plan-trip"
                  onClick={() => {
                    if (!user) {
                      navigate('/login', { state: { from: `/destinations/${id}` } });
                    } else {
                      setShowModal(true);
                    }
                  }}
                >
                  Plan a Trip
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              {relatedDests.length > 0 && (
                <div className="detail-explore-more">
                  <h3 className="detail-explore-more__title">Explore More</h3>
                  {relatedDests.map(d => (
                    <Link key={d._id} to={`/destinations/${d._id}`} className="detail-explore-item">
                      <img
                        src={d.image}
                        alt={d.name}
                        className="detail-explore-item__img"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=60'; }}
                        loading="lazy"
                      />
                      <div>
                        <div className="detail-explore-item__name">{d.name}</div>
                        <div className="detail-explore-item__region">{d.region}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Plan a Trip Modal */}
      {showModal && (
        <PlanTripModal
          destination={dest}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
