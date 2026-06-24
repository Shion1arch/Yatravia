import Hero from '../components/Hero';
import DestinationsSection from '../components/DestinationsSection';
import ExperiencesSection from '../components/ExperiencesSection';
import StatsSection from '../components/StatsSection';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <StatsSection />
      <DestinationsSection />
      <ExperiencesSection />

      {/* About Band */}
      <section className="home__about" id="about-section">
        <div className="container">
          <div className="home__about-inner">
            <div className="home__about-image-wrap">
              <img
                src="/images/rootbridge.jpg"
                alt="Beautiful Destinations"
                className="home__about-image"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80'; }}
                loading="lazy"
              />
              <div className="home__about-image-badge">
                <span className="home__about-image-badge-text">Northeast India</span>
              </div>
            </div>
            <div className="home__about-content">
              <span className="badge">✦ About Us</span>
              <h2 className="home__about-title">
                The Abode of<br/>
                <em className="home__about-em">Clouds</em>
              </h2>
              <p className="home__about-text">
                Welcome to Yatravia — your ultimate guide to discovering the world's most
                breathtaking landscapes. From majestic waterfalls plunging into deep gorges
                to crystal-clear rivers, we offer experiences that will leave
                you spellbound.
              </p>
              <p className="home__about-text">
                From pristine mountain trails and hidden forest paths to serene riverside retreats 
                and vibrant cultural hubs — Yatravia offers travel experiences that will leave
                you breathless and transformed.
              </p>
              <div className="home__about-tags">
                {['Misty Hills', 'Scenic Trails', 'Sacred Groves', 'Local Culture', 'Waterfalls', 'Caves'].map(tag => (
                  <span key={tag} className="home__about-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
