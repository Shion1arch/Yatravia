import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function UserDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, messagesRes] = await Promise.all([
          axios.get(`${API_URL}/bookings/my`),
          axios.get(`${API_URL}/contact/my`)
        ]);
        setBookings(bookingsRes.data.data);
        setMessages(messagesRes.data.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="user-dashboard">
      <div className="user-dashboard__header">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>Manage your bookings, messages, and profile.</p>
      </div>
      
      {loading ? (
        <div className="user-dashboard__loading">Loading your data...</div>
      ) : (
        <div className="user-dashboard__content">
          <div className="user-dashboard__card">
            <h3>Your Bookings</h3>
            {bookings.length === 0 ? (
              <>
                <p>You have no upcoming bookings.</p>
                <button className="user-dashboard__btn" onClick={() => navigate('/destinations')}>
                  Explore Destinations
                </button>
              </>
            ) : (
              <div className="user-dashboard__list">
                {bookings.map(b => (
                  <div key={b._id} className="user-dashboard__list-item">
                    <h4>{b.destinationName}</h4>
                    <p><strong>Date:</strong> {new Date(b.travelDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> <span className={`status status-${b.paymentStatus}`}>{b.paymentStatus}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="user-dashboard__card">
            <h3>Your Messages</h3>
            {messages.length === 0 ? (
              <p>You have not sent any messages.</p>
            ) : (
              <div className="user-dashboard__list">
                {messages.map(m => (
                  <div key={m._id} className="user-dashboard__list-item">
                    <h4>{m.subject || 'No Subject'}</h4>
                    <p className="message-text">"{m.message.substring(0, 50)}{m.message.length > 50 ? '...' : ''}"</p>
                    <p className="message-date">{new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="user-dashboard__card">
            <h3>Profile Info</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <button className="user-dashboard__btn user-dashboard__btn--outline">Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}
