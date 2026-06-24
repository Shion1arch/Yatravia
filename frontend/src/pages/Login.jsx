import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const user = await login(form.email, form.password);
        const from = location.state?.from || (user.role === 'admin' ? '/admin' : '/dashboard');
        navigate(from, { replace: true });
      } else {
        if (!form.name.trim()) { setError('Name is required.'); setLoading(false); return; }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
        if (form.password !== form.confirm) { setError('Passwords do not match.'); setLoading(false); return; }
        const user = await register(form.name, form.email, form.password);
        const from = location.state?.from || (user.role === 'admin' ? '/admin' : '/dashboard');
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel — Decorative */}
      <div className="auth-page__left">
        <div className="auth-page__left-bg" style={{ backgroundImage: "url('/images/bg_nature_valley.png')" }} />
        <div className="auth-page__left-overlay" />
        <div className="auth-page__left-content">
          <Link to="/" className="auth-page__brand">
            <img src="/images/yatravia_logo.png" alt="Yatravia logo" className="auth-page__brand-icon" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            <div>
              <div className="auth-page__brand-name">Yatravia</div>
              <div className="auth-page__brand-tagline">Discover the World</div>
            </div>
          </Link>
          <div className="auth-page__left-quote">
            <p className="auth-page__quote-text">
              "The land where clouds rest on the mountains, and rivers sing through the valleys."
            </p>
            <div className="auth-page__quote-imgs">
              {['/images/waterfall.jpg', '/images/rootbridge.jpg', '/images/caves.jpg'].map((src, i) => (
                <img key={i} src={src} alt="" className="auth-page__quote-img"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=60'; }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="auth-page__right">
        <div className="auth-form-wrap">
          {/* Mode Toggle */}
          <div className="auth-toggle">
            <button
              className={`auth-toggle__btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
              id="toggle-login"
            >Sign In</button>
            <button
              className={`auth-toggle__btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setError(''); }}
              id="toggle-signup"
            >Create Account</button>
          </div>

          <div className="auth-form-header">
            <h1 className="auth-form-title">
              {mode === 'login' ? 'Welcome back' : 'Join Yatravia'}
            </h1>
            <p className="auth-form-sub">
              {mode === 'login'
                ? 'Sign in to continue your journey'
                : 'Create an account to start exploring'}
            </p>
          </div>

          {error && (
            <div className="auth-form-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} id="auth-form">
            {mode === 'signup' && (
              <div className="auth-form__group">
                <label htmlFor="auth-name" className="auth-form__label">Full Name</label>
                <input
                  id="auth-name" type="text" name="name"
                  value={form.name} onChange={handleChange}
                  placeholder="Your full name" className="auth-form__input"
                  autoComplete="name" required
                />
              </div>
            )}

            <div className="auth-form__group">
              <label htmlFor="auth-email" className="auth-form__label">Email Address</label>
              <input
                id="auth-email" type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="you@example.com" className="auth-form__input"
                autoComplete="email" required
              />
            </div>

            <div className="auth-form__group">
              <label htmlFor="auth-password" className="auth-form__label">Password</label>
              <input
                id="auth-password" type="password" name="password"
                value={form.password} onChange={handleChange}
                placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                className="auth-form__input"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </div>

            {mode === 'signup' && (
              <div className="auth-form__group">
                <label htmlFor="auth-confirm" className="auth-form__label">Confirm Password</label>
                <input
                  id="auth-confirm" type="password" name="confirm"
                  value={form.confirm} onChange={handleChange}
                  placeholder="Repeat password" className="auth-form__input"
                  autoComplete="new-password" required
                />
              </div>
            )}

            <button
              type="submit"
              className="auth-form__submit"
              disabled={loading}
              id="auth-submit"
            >
              {loading ? (
                <><div className="auth-form__spinner" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
              ) : (
                mode === 'login' ? 'Sign In →' : 'Create Account →'
              )}
            </button>
          </form>

          <p className="auth-form-switch">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button className="auth-form-switch__btn" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>



          <Link to="/" className="auth-form__back">
            ← Back to Yatravia
          </Link>
        </div>
      </div>
    </div>
  );
}
