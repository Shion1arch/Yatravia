import { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function About() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGuides = async () => {
      try {
        const res = await axios.get(`${API_URL}/guides`);
        setGuides(res.data.data || []);
      } catch (err) {
        console.error('Error fetching guides:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__bg" style={{ backgroundImage: "url('/images/bg_nature_forest.png')" }} />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>
            ✦ Our Story
          </span>
          <h1 className="about-hero__title">About Yatravia</h1>
          <p className="about-hero__sub">
            Connecting travelers with the world's most spectacular destinations and authentic local experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission__grid">
            <div className="about-mission__image-wrap">
              <img
                src="/images/shillong.jpg"
                alt="Travelers exploring"
                className="about-mission__image"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80'; }}
              />
            </div>
            <div className="about-mission__text">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>
                We believe that travel has the power to transform.
              </p>
              <div className="about-mission__desc">
                <p>
                  Yatravia was founded on a simple principle: to make exploring the world's hidden gems accessible,
                  sustainable, and unforgettable. We curate destinations that offer a perfect blend of natural beauty,
                  adventure, and cultural richness.
                </p>
                <p>
                  Our team works tirelessly to partner with local communities, ensuring that your journey not only
                  leaves you with lifelong memories but also supports the people who call these incredible places home.
                </p>
              </div>
              <div className="about-mission__stats">
                <div className="about-mission__stat">
                  <div className="about-mission__stat-num">50+</div>
                  <div className="about-mission__stat-label">Destinations</div>
                </div>
                <div className="about-mission__stat">
                  <div className="about-mission__stat-num">10k+</div>
                  <div className="about-mission__stat-label">Happy Travelers</div>
                </div>
                <div className="about-mission__stat">
                  <div className="about-mission__stat-num">4.9</div>
                  <div className="about-mission__stat-label">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="about-guides">
        <div className="container">
          <div className="about-guides__header">
            <span className="badge">✦ Our Team</span>
            <h2 className="section-title">Meet Our Guides</h2>
            <p className="section-subtitle">
              Passionate experts who will make your journey truly extraordinary.
            </p>
          </div>

          {loading ? (
            <div className="about-loading"><div className="spinner" /></div>
          ) : guides.length > 0 ? (
            <div className="about-guides__grid">
              {guides.map(guide => (
                <div key={guide._id} className="guide-card">

                  {/* Photo */}
                  <div className="guide-card__img-wrap">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="guide-card__img"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80'; }}
                    />
                    <div className="guide-card__exp-badge">
                      {guide.experienceYears}+ Yrs Exp
                    </div>
                    {(guide.rating || guide.reviews) && (
                      <div className="guide-card__rating-badge">
                        ⭐ {guide.rating ?? 5.0}
                        {guide.reviews > 0 && <span> ({guide.reviews})</span>}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="guide-card__content">
                    <h3 className="guide-card__name">{guide.name}</h3>
                    <div className="guide-card__role">{guide.role}</div>

                    {/* Location */}
                    {guide.location && (
                      <div className="guide-card__location">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {guide.location}
                      </div>
                    )}

                    <p className="guide-card__desc">{guide.description}</p>

                    {/* Specialty Tags */}
                    {guide.specialties?.length > 0 && (
                      <div className="guide-card__specialties">
                        {guide.specialties.map((spec, i) => (
                          <span key={i} className="guide-card__specialty-tag">{spec}</span>
                        ))}
                      </div>
                    )}

                    {/* Languages */}
                    {guide.languages?.length > 0 && (
                      <div className="guide-card__langs">
                        <span className="guide-card__langs-label">Speaks:</span>
                        {guide.languages.map((lang, idx) => (
                          <span key={idx} className="guide-card__lang-tag">{lang}</span>
                        ))}
                      </div>
                    )}

                    {/* Contact Details — only shown if data exists */}
                    {(guide.phone || guide.email || guide.whatsapp) && (
                      <div className="guide-card__contact">
                        <h4 className="guide-card__contact-title">Contact</h4>

                        {guide.phone && (
                          <a href={`tel:${guide.phone}`} className="guide-card__contact-item" id={`guide-phone-${guide._id}`}>
                            <span className="guide-card__contact-icon">📞</span>
                            <span>{guide.phone}</span>
                          </a>
                        )}
                        {guide.email && (
                          <a href={`mailto:${guide.email}`} className="guide-card__contact-item" id={`guide-email-${guide._id}`}>
                            <span className="guide-card__contact-icon">✉️</span>
                            <span>{guide.email}</span>
                          </a>
                        )}
                        {guide.whatsapp && (
                          <a
                            href={`https://wa.me/${guide.whatsapp.replace(/\s+/g, '').replace('+', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="guide-card__contact-item guide-card__contact-item--whatsapp"
                            id={`guide-whatsapp-${guide._id}`}
                          >
                            <span className="guide-card__contact-icon">💬</span>
                            <span>WhatsApp Me</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Book Button */}
                    {guide.email && (
                      <a
                        href={`mailto:${guide.email}?subject=Trip Inquiry – Yatravia`}
                        className="guide-card__book-btn"
                        id={`guide-book-${guide._id}`}
                      >
                        Book This Guide →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="about-empty">No guides found. Check back soon!</div>
          )}
        </div>
      </section>
    </div>
  );
}
