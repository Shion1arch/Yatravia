import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './PlanTripModal.css';

const API_URL = import.meta.env.VITE_API_URL;

// Rough price per person based on guide type
const GUIDE_PRICE_MAP = { 'Local Guide': 49, 'Expert Guide': 51, 'Audio Guide': 45, 'None': 21 };

export default function PlanTripModal({ destination, onClose }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(null); // success state

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    travelDate: '',
    numberOfPeople: 1,
    guide: 'Local Guide',
    specialRequests: '',
    paymentConfirmed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const estimatedAmount =
    GUIDE_PRICE_MAP[form.guide] * Math.max(1, parseInt(form.numberOfPeople) || 1);

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.paymentConfirmed) {
      setError('Please confirm that you have completed the payment.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await axios.post(`${API_URL}/bookings`, {
        destinationId: destination?._id || '',
        destinationName: destination?.name || 'Unknown Destination',
        name: form.name,
        email: form.email,
        phone: form.phone,
        travelDate: form.travelDate,
        numberOfPeople: parseInt(form.numberOfPeople),
        guide: form.guide,
        specialRequests: form.specialRequests,
        amount: estimatedAmount,
      });
      setBooking(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="ptm-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ptm-dialog">
        {/* Close button */}
        <button className="ptm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Success screen */}
        {booking ? (
          <div className="ptm-success">
            <div className="ptm-success__icon">
              <svg viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                <path d="M14 26l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="ptm-success__title">Booking Confirmed!</h2>
            <p className="ptm-success__sub">
              Your trip to <strong>{destination?.name}</strong> has been booked. We'll contact you soon!
            </p>
            <div className="ptm-success__ids">
              <div className="ptm-success__id-row">
                <span className="ptm-success__id-label">Booking ID</span>
                <span className="ptm-success__id-value">{booking.bookingId}</span>
              </div>
              <div className="ptm-success__id-row">
                <span className="ptm-success__id-label">Payment ID</span>
                <span className="ptm-success__id-value">{booking.paymentId}</span>
              </div>
              <div className="ptm-success__id-row">
                <span className="ptm-success__id-label">Status</span>
                <span className="ptm-success__id-value ptm-badge ptm-badge--pending">Pending Confirmation</span>
              </div>
            </div>
            <p className="ptm-success__note">
              📧 Save your Booking ID — our team will verify your payment and send a confirmation to <strong>{booking.email}</strong>.
            </p>
            <button className="ptm-btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="ptm-header">
              <div className="ptm-header__dest">
                <span className="ptm-header__icon">✈️</span>
                <div>
                  <div className="ptm-header__label">Planning a trip to</div>
                  <div className="ptm-header__name">{destination?.name}</div>
                </div>
              </div>

              {/* Step indicator */}
              <div className="ptm-steps">
                <div className={`ptm-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                  <div className="ptm-step__dot">
                    {step > 1 ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : '1'}
                  </div>
                  <span>Trip Details</span>
                </div>
                <div className="ptm-step__line" />
                <div className={`ptm-step ${step >= 2 ? 'active' : ''}`}>
                  <div className="ptm-step__dot">2</div>
                  <span>Payment</span>
                </div>
              </div>
            </div>

            {/* Step 1 — Trip Details */}
            {step === 1 && (
              <form className="ptm-form" onSubmit={handleNext}>
                <div className="ptm-form__section-title">Your Details</div>
                <div className="ptm-form__row">
                  <div className="ptm-form__group">
                    <label htmlFor="ptm-name">Full Name <span>*</span></label>
                    <input
                      id="ptm-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Arjun Sharma"
                    />
                  </div>
                  <div className="ptm-form__group">
                    <label htmlFor="ptm-email">Email Address <span>*</span></label>
                    <input
                      id="ptm-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="ptm-form__group">
                  <label htmlFor="ptm-phone">Phone Number <span>*</span></label>
                  <input
                    id="ptm-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="ptm-form__section-title" style={{ marginTop: '20px' }}>Trip Info</div>
                <div className="ptm-form__row">
                  <div className="ptm-form__group">
                    <label htmlFor="ptm-date">Travel Date <span>*</span></label>
                    <input
                      id="ptm-date"
                      type="date"
                      name="travelDate"
                      value={form.travelDate}
                      onChange={handleChange}
                      required
                      min={today}
                    />
                  </div>
                  <div className="ptm-form__group">
                    <label htmlFor="ptm-people">Number of People <span>*</span></label>
                    <input
                      id="ptm-people"
                      type="number"
                      name="numberOfPeople"
                      value={form.numberOfPeople}
                      onChange={handleChange}
                      required
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                <div className="ptm-form__group">
                  <label htmlFor="ptm-guide">Guide Preference</label>
                  <select
                    id="ptm-guide"
                    name="guide"
                    value={form.guide}
                    onChange={handleChange}
                  >
                    <option value="Local Guide">🗣️ Local Guide</option>
                    <option value="Expert Guide">🎓 Expert Guide</option>
                    <option value="Audio Guide">🎧 Audio Guide</option>
                    <option value="None">🚫 No Guide</option>
                  </select>
                </div>
                <div className="ptm-form__group">
                  <label htmlFor="ptm-requests">Special Requests</label>
                  <textarea
                    id="ptm-requests"
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Dietary requirements, accessibility needs, anything we should know..."
                  />
                </div>

                <div className="ptm-form__footer">
                  <div className="ptm-estimate">
                    <span>Estimated Cost</span>
                    <strong>₹{estimatedAmount.toLocaleString('en-IN')}</strong>
                    <small>({form.numberOfPeople} person{form.numberOfPeople > 1 ? 's' : ''} × ₹{GUIDE_PRICE_MAP[form.guide].toLocaleString('en-IN')})</small>
                  </div>
                  <button type="submit" className="ptm-btn-primary">
                    Next — Payment
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <form className="ptm-form" onSubmit={handleSubmit}>
                {/* Booking summary */}
                <div className="ptm-summary">
                  <div className="ptm-summary__title">Booking Summary</div>
                  <div className="ptm-summary__grid">
                    <div className="ptm-summary__item">
                      <span>Destination</span>
                      <strong>{destination?.name}</strong>
                    </div>
                    <div className="ptm-summary__item">
                      <span>Traveler</span>
                      <strong>{form.name}</strong>
                    </div>
                    <div className="ptm-summary__item">
                      <span>Travel Date</span>
                      <strong>{new Date(form.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                    </div>
                    <div className="ptm-summary__item">
                      <span>People</span>
                      <strong>{form.numberOfPeople}</strong>
                    </div>
                    <div className="ptm-summary__item">
                      <span>Guide</span>
                      <strong>{form.guide}</strong>
                    </div>
                    <div className="ptm-summary__item ptm-summary__item--total">
                      <span>Total Amount</span>
                      <strong>₹{estimatedAmount.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>

                {/* QR Payment Section */}
                <div className="ptm-payment">
                  <div className="ptm-payment__header">
                    <div className="ptm-payment__icon">📱</div>
                    <div>
                      <div className="ptm-payment__title">Scan & Pay</div>
                      <div className="ptm-payment__sub">Use any UPI app to complete payment</div>
                    </div>
                  </div>

                  <div className="ptm-qr-wrap">
                    <div className="ptm-qr-card">
                      {/* QR Code placeholder */}
                      <div className="ptm-qr-img">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=souradeepdas8259@oksbi&pn=Yatravia&am=${estimatedAmount}&cu=INR`)}`} 
                          alt="Payment QR Code" 
                          className="ptm-qr-svg" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="ptm-qr-upi">
                        <span className="ptm-qr-upi-label">UPI ID</span>
                        <span className="ptm-qr-upi-id">souradeepdas8259@oksbi</span>
                      </div>
                      <div className="ptm-qr-amount">
                        Pay ₹{estimatedAmount.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="ptm-payment-steps">
                      <div className="ptm-payment-step">
                        <span className="ptm-payment-step__num">1</span>
                        <span>Open any UPI app (PhonePe, GPay, Paytm)</span>
                      </div>
                      <div className="ptm-payment-step">
                        <span className="ptm-payment-step__num">2</span>
                        <span>Scan the QR code or enter UPI ID</span>
                      </div>
                      <div className="ptm-payment-step">
                        <span className="ptm-payment-step__num">3</span>
                        <span>Enter amount: ₹{estimatedAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="ptm-payment-step">
                        <span className="ptm-payment-step__num">4</span>
                        <span>Complete & confirm below</span>
                      </div>
                    </div>
                  </div>

                  <label className="ptm-confirm-check">
                    <input
                      type="checkbox"
                      name="paymentConfirmed"
                      checked={form.paymentConfirmed}
                      onChange={handleChange}
                      id="ptm-payment-done"
                    />
                    <span className="ptm-confirm-check__box" />
                    <span>I have completed the payment of <strong>₹{estimatedAmount.toLocaleString('en-IN')}</strong></span>
                  </label>
                </div>

                {error && <div className="ptm-error">{error}</div>}

                <div className="ptm-form__footer">
                  <button
                    type="button"
                    className="ptm-btn-outline"
                    onClick={() => { setStep(1); setError(''); }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="ptm-btn-primary"
                    disabled={saving}
                    id="ptm-submit-booking"
                  >
                    {saving ? (
                      <>
                        <span className="ptm-spinner" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12l5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
