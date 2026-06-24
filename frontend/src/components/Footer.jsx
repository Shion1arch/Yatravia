import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Explore: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Khasi Hills', href: '/destinations?region=Khasi Hills' },
    { label: 'Jaintia Hills', href: '/destinations?region=Jaintia Hills' },
    { label: 'Garo Hills', href: '/destinations?region=Garo Hills' },
  ],
  Plan: [
    { label: 'Best Time to Visit', href: '/contact' },
    { label: 'How to Reach', href: '/contact' },
    { label: 'Where to Stay', href: '/contact' },
    { label: 'Travel Tips', href: '/contact' },
  ],
  Connect: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'About Us', href: '/destinations' },
    { label: 'Photo Gallery', href: '/experiences' },
  ],
};

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Newsletter Band */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-inner">
            <div>
              <h3 className="footer__newsletter-title">
                Plan Your Next Journey
              </h3>
              <p className="footer__newsletter-sub">
                Get travel tips, destination guides, and seasonal updates
              </p>
            </div>
            <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()} id="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="footer__newsletter-input"
                id="newsletter-email"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="footer__newsletter-btn" id="newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__brand-logo">
                <div className="footer__logo-icon">
                  <img src="/images/yatravia_logo.png" alt="Yatravia logo" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
                </div>
                <div>
                  <div className="footer__brand-name">Yatravia</div>
                  <div className="footer__brand-tagline">Travel & Tours</div>
                </div>
              </div>
              <p className="footer__brand-desc">
                Your gateway to the world — discover the magic of Earth's
                most beautiful destinations and experiences.oot bridges, and vibrant tribal culture.
              </p>
              <div className="footer__socials">
                {socials.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social"
                    aria-label={s.name}
                    id={`social-${s.name.toLowerCase()}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="footer__links-group">
                <h4 className="footer__links-title">{section}</h4>
                <ul className="footer__links-list">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.href} className="footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copyright">
              © {new Date().getFullYear()} Yatravia — Travel & Tours. Built with MERN Stack.
            </p>
            <div className="footer__bottom-links">
              <Link to="/contact" className="footer__bottom-link">Privacy Policy</Link>
              <span className="footer__bottom-divider">·</span>
              <Link to="/contact" className="footer__bottom-link">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
