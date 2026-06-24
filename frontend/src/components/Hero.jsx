import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background Image */}
      <div
        className="hero__bg"
        style={{ backgroundImage: `url('/images/bg_nature_waterfall.png')` }}
        aria-hidden="true"
      />

      {/* Green gradient overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Land of Clouds · Northeast India
        </div>

        <h1 className="hero__title">
          Symphony in the
          <em className="hero__title-em"> Mist.</em>
        </h1>

        <p className="hero__subtitle">
          Discover Meghalaya — where nature's grandeur meets ancient culture,
          and every trail leads to a breathtaking wonder.
        </p>

        <div className="hero__actions">
          <Link to="/destinations" className="hero__btn-primary" id="hero-explore-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Explore Destinations
          </Link>
          <Link to="/experiences" className="hero__btn-outline" id="hero-experience-btn">
            Discover Experiences
          </Link>
        </div>

        {/* Stats Row */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">340m</span>
            <span className="hero__stat-label">Tallest Falls</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">11K+</span>
            <span className="hero__stat-label">mm Annual Rain</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">3</span>
            <span className="hero__stat-label">Hill Regions</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-text">Discover</span>
        <div className="hero__scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
