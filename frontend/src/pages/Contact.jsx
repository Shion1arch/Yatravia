import { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await axios.post(`${API_URL}/contact`, form);
      if (res.data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.message || 'Could not send message. Please try again.');
    }
  };

  const infoCards = [
    { icon: '📍', title: 'Office', text: 'Tourism House\nNew Delhi – 110001, India' },
    { icon: '📞', title: 'Phone', text: '+91 84148 06689\nMon – Sat, 9am to 6pm' },
    { icon: '✉️', title: 'Email', text: 'dsouradeep79@gmail.com' },
  ];

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="contact-page__hero">
        <div className="contact-page__hero-bg" style={{ backgroundImage: "url('/images/bg_nature_valley.png')" }} />
        <div className="contact-page__hero-overlay" />
        <div className="container">
          <div className="contact-page__hero-content">
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>
              ✦ Get In Touch
            </span>
            <h1 className="contact-page__hero-title">Contact Us</h1>
            <p className="contact-page__hero-sub">
              Plan your trip to the Land of Clouds
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="contact-page__content">
        <div className="container">
          <div className="contact-page__grid">
            {/* Info */}
            <div className="contact-page__info">
              <h2 className="contact-page__info-title">Let's Plan Your<br/>Next Journey</h2>
              <p className="contact-page__info-desc">
                Have questions about traveling? Want to know the best time to visit
                a specific destination or need a custom itinerary? Our local experts are here to help.
              </p>

              <div className="contact-page__info-cards">
                {infoCards.map(card => (
                  <div key={card.title} className="contact-info-card">
                    <div className="contact-info-card__icon">{card.icon}</div>
                    <div>
                      <div className="contact-info-card__title">{card.title}</div>
                      <div className="contact-info-card__text">{card.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-page__image-wrap">
                <img
                  src="/images/dawki.jpg"
                  alt="Beautiful River"
                  className="contact-page__image"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'; }}
                  loading="lazy"
                />
                <div className="contact-page__image-caption">
                  Dawki River — Meghalaya's Crystal Jewel
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-page__form-wrap">
              <div className="contact-form-card">
                <h3 className="contact-form-card__title">Send Us a Message</h3>
                <p className="contact-form-card__sub">We'll get back to you within 24 hours</p>

                {status === 'success' && (
                  <div className="contact-form__success">
                    <div className="contact-form__success-icon">✅</div>
                    <div>
                      <strong>Message sent successfully!</strong>
                      <p>We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="contact-form__error">
                    <span>⚠️ {error}</span>
                  </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="contact-name" className="contact-form__label">Your Name *</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="contact-form__input"
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="contact-email" className="contact-form__label">Email Address *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="contact-form__input"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="contact-subject" className="contact-form__label">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="contact-form__input"
                    >
                      <option value="">Select a topic...</option>
                      <option value="itinerary">Trip Itinerary Help</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="transport">How to Reach</option>
                      <option value="guide">Local Guide</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="contact-message" className="contact-form__label">Your Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans or questions..."
                      className="contact-form__input contact-form__textarea"
                      required
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={status === 'loading'}
                    id="contact-submit"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="contact-form__submit-spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
                          <path d="m21.854 2.147-10.94 10.939"/>
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
