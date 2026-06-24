import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ExperiencesSection.css';

const API_URL = import.meta.env.VITE_API_URL;

const fallbackExperiences = [
  {
    _id: '1',
    title: 'Nature & Wildlife',
    category: 'Nature & Wildlife',
    description: 'Explore pristine biodiversity hotspots, sacred groves, national parks, and rare wildlife in lush green forests.',
    image: '/images/rootbridge.jpg',
    icon: '🌿',
  },
  {
    _id: '2',
    title: 'Adventure & Outdoor',
    category: 'Adventure & Outdoor',
    description: 'Trek through jungles, kayak crystal rivers, rappel into caves, and conquer the rugged terrain of the cloud-capped hills.',
    image: '/images/caves.jpg',
    icon: '⛰️',
  },
  {
    _id: '3',
    title: 'Culture & Lifestyle',
    category: 'Culture & Lifestyle',
    description: 'Immerse yourself in the rich traditions of the Khasi, Jaintia, and Garo tribes — their music, craft, cuisine, and way of life.',
    image: '/images/festival.jpg',
    icon: '🎭',
  },
];

export default function ExperiencesSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${API_URL}/experiences`);
        setExperiences(res.data.data?.length ? res.data.data : fallbackExperiences);
      } catch {
        setExperiences(fallbackExperiences);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section className="experiences-section" id="experiences-section">
      <div className="container">
        <div className="experiences-section__header">
          <span className="badge">✦ What Awaits You</span>
          <h2 className="section-title experiences-section__title">
            Curated Experiences
          </h2>
          <p className="section-subtitle">
            From misty rainforests to ancient tribal traditions — your adventure starts here
          </p>
        </div>

        {loading ? (
          <div className="experiences-section__loading">
            <div className="spinner" />
          </div>
        ) : (
          <div className="experiences-section__grid">
            {experiences.slice(0, 3).map((exp, i) => (
              <ExperienceCard key={exp._id} exp={exp} index={i} />
            ))}
          </div>
        )}

        <div className="experiences-section__cta">
          <Link to="/experiences" className="btn-primary" id="explore-all-experiences">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Explore All Experiences
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }) {
  return (
    <div
      className="exp-card"
      id={`exp-card-${exp._id}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="exp-card__image-wrap">
        <img
          src={exp.image}
          alt={exp.title}
          className="exp-card__image"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80'; }}
          loading="lazy"
        />
        <div className="exp-card__overlay" />
        <div className="exp-card__icon">{exp.icon}</div>
      </div>
      <div className="exp-card__content">
        <h3 className="exp-card__title">{exp.title}</h3>
        <p className="exp-card__desc">{exp.description}</p>
        <Link to="/experiences" className="exp-card__link">
          Learn More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
