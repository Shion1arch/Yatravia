import { useState, useEffect } from 'react';
import axios from 'axios';
import './Experiences.css';

const API_URL = import.meta.env.VITE_API_URL;

const allExperiences = [
  {
    _id: '1',
    title: 'Nature & Wildlife',
    category: 'Nature & Wildlife',
    description: 'Explore pristine biodiversity hotspots, sacred groves, national parks, and rare wildlife in lush green forests.',
    image: '/images/rootbridge.jpg',
    icon: '🌿',
    items: ['Nokrek National Park', 'Balpakram National Park', 'Siju Bird Sanctuary', 'Mawphlang Sacred Groves', 'Nongkhyllem Wildlife Sanctuary'],
  },
  {
    _id: '2',
    title: 'Adventure & Outdoor',
    category: 'Adventure & Outdoor',
    description: 'Trek through jungles, kayak crystal rivers, rappel into caves, and conquer the rugged terrain of the cloud-capped hills.',
    image: '/images/caves.jpg',
    icon: '⛰️',
    items: ['Caving in Mawsmai', 'Trekking to Root Bridges', 'River Kayaking at Dawki', 'Rappelling & Ziplining', 'Camping in Sohra'],
  },
  {
    _id: '3',
    title: 'Culture & Lifestyle',
    category: 'Culture & Lifestyle',
    description: 'Immerse yourself in the rich traditions of the Khasi, Jaintia, and Garo tribes — their music, craft, cuisine, and way of life.',
    image: '/images/festival.jpg',
    icon: '🎭',
    items: ['Shad Suk Mynsiem Festival', 'Wangala Festival (Garo)', 'Nongkrem Dance', 'Local Craft Markets', 'Traditional Cuisine Trail'],
  },
  {
    _id: '4',
    title: 'Festivals & Events',
    category: 'Festivals & Events',
    description: 'Experience the vibrant energy of local communities through colorful tribal festivals, music events, and cultural celebrations.',
    image: '/images/shillong.jpg',
    icon: '🎪',
    items: ['Autumn Festival', 'Cherry Blossom Festival', 'Winter Festival', 'Spring Festival', 'Harvest Festival'],
  },
];

export default function Experiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_URL}/experiences`);
        const data = res.data.data?.length >= 3 ? res.data.data : allExperiences;
        setExperiences(data);
        setActive(data[0]?._id || null);
      } catch {
        setExperiences(allExperiences);
        setActive(allExperiences[0]._id);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const activeExp = experiences.find(e => e._id === active) || experiences[0];

  return (
    <div className="experiences-page">
      {/* Hero */}
      <div className="experiences-page__hero">
        <div className="experiences-page__hero-bg" style={{ backgroundImage: "url('/images/bg_nature_forest.png')" }} />
        <div className="experiences-page__hero-overlay" />
        <div className="container">
          <div className="experiences-page__hero-content">
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>
              ✦ What Awaits You
            </span>
            <h1 className="experiences-page__hero-title">Experiences</h1>
            <p className="experiences-page__hero-sub">From misty rainforests to vibrant tribal festivals</p>
          </div>
        </div>
      </div>

      {/* Tab Explorer */}
      {!loading && experiences.length > 0 && (
        <section className="experiences-page__explorer">
          <div className="container">
            {/* Tabs */}
            <div className="experiences-page__tabs" role="tablist">
              {experiences.map(exp => (
                <button
                  key={exp._id}
                  className={`experiences-page__tab ${active === exp._id ? 'active' : ''}`}
                  onClick={() => setActive(exp._id)}
                  role="tab"
                  aria-selected={active === exp._id}
                  id={`exp-tab-${exp._id}`}
                >
                  <span className="experiences-page__tab-icon">{exp.icon}</span>
                  <span>{exp.title}</span>
                </button>
              ))}
            </div>

            {/* Panel */}
            {activeExp && (
              <div className="experiences-page__panel" key={activeExp._id}>
                <div className="experiences-page__panel-img-wrap">
                  <img
                    src={activeExp.image}
                    alt={activeExp.title}
                    className="experiences-page__panel-img"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'; }}
                    loading="lazy"
                  />
                  <div className="experiences-page__panel-img-overlay" />
                  <div className="experiences-page__panel-badge">
                    {activeExp.icon} {activeExp.category}
                  </div>
                </div>

                <div className="experiences-page__panel-content">
                  <h2 className="experiences-page__panel-title">{activeExp.title}</h2>
                  <p className="experiences-page__panel-desc">{activeExp.description}</p>

                  {activeExp.items?.length > 0 && (
                    <div className="experiences-page__panel-items">
                      <h3 className="experiences-page__panel-items-title">Featured Activities</h3>
                      <ul className="experiences-page__panel-list">
                        {activeExp.items.map(item => (
                          <li key={item} className="experiences-page__panel-list-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M20 6 9 17l-5-5"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* All Experiences Grid */}
      <section className="experiences-page__all">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 40 }}>All Experiences</h2>
          <div className="experiences-page__grid">
            {allExperiences.map((exp, i) => (
              <div
                key={exp._id}
                className="exp-page-card"
                id={`exp-page-card-${exp._id}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="exp-page-card__image-wrap">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="exp-page-card__image"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80'; }}
                    loading="lazy"
                  />
                  <div className="exp-page-card__overlay" />
                  <span className="exp-page-card__icon">{exp.icon}</span>
                </div>
                <div className="exp-page-card__info">
                  <h3 className="exp-page-card__title">{exp.title}</h3>
                  <p className="exp-page-card__desc">{exp.description}</p>
                  <button
                    className="exp-page-card__btn"
                    onClick={() => { setActive(exp._id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                    id={`learn-more-${exp._id}`}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
