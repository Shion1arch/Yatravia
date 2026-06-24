import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navClass = `navbar ${scrolled || !isHome ? 'navbar--solid' : 'navbar--transparent'} ${menuOpen ? 'navbar--open' : ''}`;

  return (
    <header className={navClass} id="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="nav-logo">
          <img
            src="/images/yatravia_logo.png"
            alt="Yatravia logo"
            className="navbar__logo-img"
          />
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">Yatravia</span>
            <span className="navbar__logo-tagline">Travel &amp; Tours</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}
              id={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA & Auth */}
        <div className="navbar__actions">
          {isAdmin ? (
            <Link to="/admin" className="navbar__link" style={{ fontWeight: 700, color: '#6BA4D4' }}>
              Admin
            </Link>
          ) : user ? (
            <Link to="/dashboard" className="navbar__link" style={{ fontWeight: 700, color: '#6BA4D4' }}>
              Dashboard
            </Link>
          ) : null}
          
          {user ? (
            <button 
              className="navbar__link" 
              onClick={() => { logout(); navigate('/'); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="navbar__link">
              Login
            </Link>
          )}

          <Link to="/destinations" className="navbar__cta" id="nav-plan-trip">
            Plan Your Trip
          </Link>
          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} id="mobile-menu">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        
        {isAdmin ? (
          <Link to="/admin" className="navbar__mobile-link" style={{ color: '#6BA4D4' }} onClick={() => setMenuOpen(false)}>
            Admin Dashboard
          </Link>
        ) : user ? (
          <Link to="/dashboard" className="navbar__mobile-link" style={{ color: '#6BA4D4' }} onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        ) : null}

        {user ? (
          <button 
            className="navbar__mobile-link" 
            onClick={() => { setMenuOpen(false); logout(); navigate('/'); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: 0 }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}

        <Link to="/destinations" className="navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
          Plan Your Trip
        </Link>
      </div>
    </header>
  );
}
