import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'destinations', label: 'Destinations', icon: '🗺️' },
  { id: 'experiences', label: 'Experiences', icon: '✨' },
  { id: 'guides', label: 'Guides', icon: '🧑‍🦯' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'messages', label: 'Messages', icon: '📬' },
  { id: 'bookings', label: 'Bookings', icon: '🗓️' },
];

const CATEGORIES = ['Trekking', 'Waterfalls', 'Valley', 'Canyons', 'Rivers', 'Heritage', 'Wildlife', 'Adventure'];

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <div className="admin-modal__icon">⚠️</div>
        <h3 className="admin-modal__title">Confirm Action</h3>
        <p className="admin-modal__msg">{message}</p>
        <div className="admin-modal__btns">
          <button className="admin-modal__cancel" onClick={onCancel}>Cancel</button>
          <button className="admin-modal__confirm" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

function AddDestModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '', region: '', category: 'Nature', shortDesc: '',
    description: '', image: '', bestTime: '', featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true); setErr('');
    try {
      const res = await axios.post(`${API_URL}/destinations`, form);
      onSave(res.data.data);
    } catch (err) {
      setErr(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal admin-modal--lg">
        <h3 className="admin-modal__title">Add New Destination</h3>
        {err && <div className="admin-form-error">{err}</div>}
        <form onSubmit={handleSubmit} className="admin-add-form">
          <div className="admin-add-form__row">
            <div className="admin-add-form__group">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Destination name" />
            </div>
            <div className="admin-add-form__group">
              <label>Location / Region *</label>
              <input name="region" value={form.region} onChange={handleChange} required placeholder="e.g. Khasi Hills, Bali, Paris" />
            </div>
          </div>
          <div className="admin-add-form__row">
            <div className="admin-add-form__group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-add-form__group">
              <label>Best Time to Visit</label>
              <input name="bestTime" value={form.bestTime} onChange={handleChange} placeholder="e.g. October to May" />
            </div>
          </div>
          <div className="admin-add-form__group">
            <label>Short Description</label>
            <input name="shortDesc" value={form.shortDesc} onChange={handleChange} placeholder="One-line summary" />
          </div>
          <div className="admin-add-form__group">
            <label>Full Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="Detailed description..." />
          </div>
          <div className="admin-add-form__group">
            <label>Image Path</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="/images/waterfall.jpg" />
          </div>
          <div className="admin-add-form__check">
            <input type="checkbox" id="add-featured" name="featured" checked={form.featured} onChange={handleChange} />
            <label htmlFor="add-featured">Mark as Featured (shown on homepage)</label>
          </div>
          <div className="admin-modal__btns" style={{ marginTop: 8 }}>
            <button type="button" className="admin-modal__cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-modal__confirm" disabled={saving}>
              {saving ? 'Saving...' : 'Add Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddGuideModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '', role: 'Tour Guide', description: '', image: '', experienceYears: 1, languages: ''
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true); setErr('');
    try {
      const payload = { ...form, languages: form.languages.split(',').map(l => l.trim()).filter(Boolean) };
      const res = await axios.post(`${API_URL}/guides`, payload);
      onSave(res.data.data);
    } catch (err) {
      setErr(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal admin-modal--lg">
        <h3 className="admin-modal__title">Add New Guide</h3>
        {err && <div className="admin-form-error">{err}</div>}
        <form onSubmit={handleSubmit} className="admin-add-form">
          <div className="admin-add-form__row">
            <div className="admin-add-form__group">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Guide name" />
            </div>
            <div className="admin-add-form__group">
              <label>Role *</label>
              <input name="role" value={form.role} onChange={handleChange} required placeholder="e.g. Senior Guide" />
            </div>
          </div>
          <div className="admin-add-form__row">
            <div className="admin-add-form__group">
              <label>Experience (Years) *</label>
              <input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} required min="0" />
            </div>
            <div className="admin-add-form__group">
              <label>Languages (comma-separated)</label>
              <input name="languages" value={form.languages} onChange={handleChange} placeholder="English, Spanish" />
            </div>
          </div>
          <div className="admin-add-form__group">
            <label>Image URL *</label>
            <input name="image" value={form.image} onChange={handleChange} required placeholder="https://..." />
          </div>
          <div className="admin-add-form__group">
            <label>Bio / Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="About the guide..." />
          </div>
          <div className="admin-modal__btns" style={{ marginTop: 8 }}>
            <button type="button" className="admin-modal__cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-modal__confirm" disabled={saving}>
              {saving ? 'Saving...' : 'Add Guide'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Data
  const [stats, setStats] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [guides, setGuides] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [confirm, setConfirm] = useState(null); // { type, id, message }
  const [showAddDest, setShowAddDest] = useState(false);
  const [showAddGuide, setShowAddGuide] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMsg, setExpandedMsg] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, destsRes, expsRes, guidesRes, usersRes, msgsRes, bookingsRes] = await Promise.all([
        axios.get(`${API_URL}/stats`),
        axios.get(`${API_URL}/destinations`),
        axios.get(`${API_URL}/experiences`),
        axios.get(`${API_URL}/guides`),
        axios.get(`${API_URL}/users`),
        axios.get(`${API_URL}/messages`),
        axios.get(`${API_URL}/bookings`),
      ]);
      setStats(statsRes.data.data);
      setDestinations(destsRes.data.data || []);
      setExperiences(expsRes.data.data || []);
      setGuides(guidesRes.data.data || []);
      setUsers(usersRes.data.data || []);
      setMessages(msgsRes.data.data || []);
      setBookings(bookingsRes.data.data || []);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = (type, id, name) => {
    setConfirm({ type, id, message: `Delete "${name}"? This cannot be undone.` });
  };

  const doDelete = async () => {
    if (!confirm) return;
    try {
      await axios.delete(`${API_URL}/${confirm.type}/${confirm.id}`);
      if (confirm.type === 'destinations') setDestinations(prev => prev.filter(d => d._id !== confirm.id));
      if (confirm.type === 'experiences') setExperiences(prev => prev.filter(e => e._id !== confirm.id));
      if (confirm.type === 'guides') setGuides(prev => prev.filter(g => g._id !== confirm.id));
      if (confirm.type === 'users') setUsers(prev => prev.filter(u => u._id !== confirm.id));
      if (confirm.type === 'bookings') {
        setBookings(prev => prev.filter(b => b._id !== confirm.id));
        setStats(prev => prev ? { ...prev, bookings: (prev.bookings || 1) - 1 } : prev);
      }
      if (confirm.type === 'messages') {
        setMessages(prev => prev.filter(m => m._id !== confirm.id));
        setStats(prev => prev ? { ...prev, messages: (prev.messages || 1) - 1 } : prev);
      }
      if (confirm.type === 'destinations' || confirm.type === 'experiences' || confirm.type === 'users' || confirm.type === 'guides') {
        setStats(prev => prev ? { ...prev, [confirm.type]: (prev[confirm.type] || 1) - 1 } : prev);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setConfirm(null);
    }
  };

  const handleMarkRead = async (msgId) => {
    try {
      await axios.put(`${API_URL}/messages/${msgId}/read`);
      setMessages(prev => prev.map(m => m._id === msgId ? { ...m, read: true } : m));
      setStats(prev => prev ? { ...prev, unreadMessages: Math.max(0, (prev.unreadMessages || 1) - 1) } : prev);
    } catch (err) {
      console.error('Mark read error:', err);
    }
  };

  const handleConfirmPayment = async (bookingId) => {
    try {
      const res = await axios.put(`${API_URL}/bookings/${bookingId}/confirm`);
      setBookings(prev => prev.map(b => b._id === bookingId ? res.data.data : b));
      setStats(prev => prev ? { ...prev, pendingBookings: Math.max(0, (prev.pendingBookings || 1) - 1) } : prev);
    } catch (err) {
      console.error('Confirm payment error:', err);
    }
  };

  const handleToggleFeatured = async (dest) => {
    try {
      const res = await axios.put(`${API_URL}/destinations/${dest._id}`, { featured: !dest.featured });
      setDestinations(prev => prev.map(d => d._id === dest._id ? res.data.data : d));
    } catch (err) {
      console.error('Toggle featured error:', err);
    }
  };

  const handleAddDestination = (newDest) => {
    setDestinations(prev => [newDest, ...prev]);
    setStats(prev => prev ? { ...prev, destinations: (prev.destinations || 0) + 1 } : prev);
    setShowAddDest(false);
  };

  const handleAddGuide = (newGuide) => {
    setGuides(prev => [newGuide, ...prev]);
    setStats(prev => prev ? { ...prev, guides: (prev.guides || 0) + 1 } : prev);
    setShowAddGuide(false);
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="admin-layout">
      {/* Modals */}
      {confirm && <ConfirmModal message={confirm.message} onConfirm={doDelete} onCancel={() => setConfirm(null)} />}
      {showAddDest && <AddDestModal onClose={() => setShowAddDest(false)} onSave={handleAddDestination} />}
      {showAddGuide && <AddGuideModal onClose={() => setShowAddGuide(false)} onSave={handleAddGuide} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src="/images/yatravia_logo.png" alt="Yatravia Logo" className="admin-sidebar__logo" style={{ height: '36px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          <div>
            <div className="admin-sidebar__brand-name">Yatravia</div>
            <div className="admin-sidebar__brand-role">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`admin-sidebar__nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              id={`admin-nav-${item.id}`}
            >
              <span className="admin-sidebar__nav-icon">{item.icon}</span>
              {item.label}
              {item.id === 'messages' && stats?.unreadMessages > 0 && (
                <span className="admin-sidebar__unread-badge">{stats.unreadMessages}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div className="admin-sidebar__user-name">{user?.name}</div>
              <div className="admin-sidebar__user-role">Administrator</div>
            </div>
          </div>
          <div className="admin-sidebar__footer-links">
            <Link to="/" className="admin-sidebar__link" id="admin-view-site">🌐 View Site</Link>
            <button className="admin-sidebar__logout" onClick={handleLogout} id="admin-logout">
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <button className="admin-topbar__menu" onClick={() => setSidebarOpen(!sidebarOpen)} id="admin-menu-toggle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="admin-topbar__title">
                {NAV_ITEMS.find(n => n.id === activeTab)?.label}
              </h1>
              <p className="admin-topbar__sub">Manage your Yatravia content</p>
            </div>
          </div>
          <div className="admin-topbar__right">
            <span className="admin-topbar__badge">Admin</span>
            <div className="admin-topbar__avatar">{user?.name?.[0]?.toUpperCase()}</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {loading ? (
            <div className="admin-loading"><div className="spinner" /><p>Loading data...</p></div>
          ) : (
            <>
              {/* ── OVERVIEW ── */}
              {activeTab === 'overview' && (
                <div className="admin-overview">
                  <div className="admin-stats-grid">
                    {[
                      { label: 'Destinations', value: stats?.destinations ?? 0, icon: '🗺️', color: 'var(--orange-500)' },
                      { label: 'Experiences', value: stats?.experiences ?? 0, icon: '✨', color: 'var(--orange-600)' },
                      { label: 'Guides', value: stats?.guides ?? 0, icon: '🧑‍🦯', color: '#F59E0B' },
                      { label: 'Users', value: stats?.users ?? 0, icon: '👥', color: '#EC4899' },
                      { label: 'Messages', value: stats?.messages ?? 0, icon: '📬', color: '#14B8A6', sub: `${stats?.unreadMessages ?? 0} unread` },
                      { label: 'Bookings', value: stats?.bookings ?? 0, icon: '🗓️', color: '#6366F1', sub: `${stats?.pendingBookings ?? 0} pending` },
                    ].map(s => (
                      <div className="admin-stat-card" key={s.label} style={{ borderTopColor: s.color }}>
                        <div className="admin-stat-card__icon" style={{ background: s.color + '18' }}>{s.icon}</div>
                        <div className="admin-stat-card__value">{s.value}</div>
                        <div className="admin-stat-card__label">{s.label}</div>
                        {s.sub && <div className="admin-stat-card__sub">{s.sub}</div>}
                      </div>
                    ))}
                  </div>

                  {/* Recent Destinations */}
                  <div className="admin-overview__section">
                    <div className="admin-section-header">
                      <h2 className="admin-section-title">Recent Destinations</h2>
                      <button className="admin-btn-sm" onClick={() => setActiveTab('destinations')}>View All →</button>
                    </div>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr><th>Name</th><th>Region</th><th>Category</th><th>Featured</th></tr>
                        </thead>
                        <tbody>
                          {destinations.slice(0, 5).map(d => (
                            <tr key={d._id}>
                              <td className="admin-table__name">{d.name}</td>
                              <td><span className="admin-tag">{d.region}</span></td>
                              <td>{d.category}</td>
                              <td>
                                <span className={`admin-badge ${d.featured ? 'admin-badge--green' : 'admin-badge--gray'}`}>
                                  {d.featured ? '⭐ Featured' : 'Normal'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Users */}
                  <div className="admin-overview__section">
                    <div className="admin-section-header">
                      <h2 className="admin-section-title">Recent Users</h2>
                      <button className="admin-btn-sm" onClick={() => setActiveTab('users')}>View All →</button>
                    </div>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr>
                        </thead>
                        <tbody>
                          {users.slice(0, 4).map(u => (
                            <tr key={u._id}>
                              <td className="admin-table__name">
                                <div className="admin-user-cell">
                                  <div className="admin-user-avatar">{u.name?.[0]?.toUpperCase()}</div>
                                  {u.name}
                                </div>
                              </td>
                              <td style={{ color: 'var(--neutral-500)', fontSize: '0.85rem' }}>{u.email}</td>
                              <td>
                                <span className={`admin-badge ${u.role === 'admin' ? 'admin-badge--purple' : 'admin-badge--gray'}`}>
                                  {u.role}
                                </span>
                              </td>
                              <td style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>
                                {new Date(u.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── DESTINATIONS ── */}
              {activeTab === 'destinations' && (
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">All Destinations ({destinations.length})</h2>
                    <button className="admin-btn-primary" onClick={() => setShowAddDest(true)} id="admin-add-dest">
                      + Add Destination
                    </button>
                  </div>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr><th>Name</th><th>Region</th><th>Category</th><th>Featured</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {destinations.map(d => (
                          <tr key={d._id}>
                            <td>
                              <div className="admin-dest-cell">
                                <img src={d.image} alt={d.name} className="admin-dest-thumb"
                                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=50'; }} />
                                <span className="admin-table__name">{d.name}</span>
                              </div>
                            </td>
                            <td><span className="admin-tag">{d.region}</span></td>
                            <td>{d.category}</td>
                            <td>
                              <button
                                className={`admin-featured-toggle ${d.featured ? 'on' : ''}`}
                                onClick={() => handleToggleFeatured(d)}
                                title={d.featured ? 'Remove from featured' : 'Mark as featured'}
                              >
                                {d.featured ? '⭐ Featured' : '☆ Normal'}
                              </button>
                            </td>
                            <td>
                              <div className="admin-actions">
                                <Link to={`/destinations/${d._id}`} className="admin-action-btn admin-action-btn--view"
                                  target="_blank" title="View on site">
                                  👁️
                                </Link>
                                <button className="admin-action-btn admin-action-btn--delete"
                                  onClick={() => handleDelete('destinations', d._id, d.name)} title="Delete">
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── EXPERIENCES ── */}
              {activeTab === 'experiences' && (
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">All Experiences ({experiences.length})</h2>
                  </div>
                  <div className="admin-exp-grid">
                    {experiences.map(exp => (
                      <div key={exp._id} className="admin-exp-card">
                        <div className="admin-exp-card__img-wrap">
                          <img src={exp.image} alt={exp.title} className="admin-exp-card__img"
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=60'; }} />
                        </div>
                        <div className="admin-exp-card__info">
                          <div className="admin-exp-card__icon">{exp.icon}</div>
                          <h3 className="admin-exp-card__title">{exp.title}</h3>
                          <p className="admin-exp-card__desc">{exp.description?.slice(0, 80)}...</p>
                          <span className={`admin-badge ${exp.featured ? 'admin-badge--green' : 'admin-badge--gray'}`}>
                            {exp.featured ? 'Featured' : 'Normal'}
                          </span>
                          <button className="admin-action-btn admin-action-btn--delete"
                            style={{ marginTop: 12 }}
                            onClick={() => handleDelete('experiences', exp._id, exp.title)}>
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── GUIDES ── */}
              {activeTab === 'guides' && (
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">All Guides ({guides.length})</h2>
                    <button className="admin-btn-primary" onClick={() => setShowAddGuide(true)}>
                      + Add Guide
                    </button>
                  </div>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr><th>Name</th><th>Role</th><th>Experience</th><th>Languages</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {guides.map(g => (
                          <tr key={g._id}>
                            <td>
                              <div className="admin-dest-cell">
                                <img src={g.image} alt={g.name} className="admin-dest-thumb" style={{ borderRadius: '50%' }}
                                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=50'; }} />
                                <span className="admin-table__name">{g.name}</span>
                              </div>
                            </td>
                            <td>{g.role}</td>
                            <td>{g.experienceYears} Years</td>
                            <td>
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {g.languages?.map((l, i) => (
                                  <span key={i} className="admin-tag" style={{ background: 'var(--orange-100)', color: 'var(--orange-800)' }}>{l}</span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <button className="admin-action-btn admin-action-btn--delete"
                                onClick={() => handleDelete('guides', g._id, g.name)} title="Delete">
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── USERS ── */}
              {activeTab === 'users' && (
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">All Users ({users.length})</h2>
                  </div>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u._id}>
                            <td>
                              <div className="admin-user-cell">
                                <div className="admin-user-avatar" style={{ background: u.role === 'admin' ? 'var(--orange-600)' : 'var(--orange-500)' }}>
                                  {u.name?.[0]?.toUpperCase()}
                                </div>
                                <span className="admin-table__name">{u.name}</span>
                              </div>
                            </td>
                            <td style={{ color: 'var(--neutral-500)', fontSize: '0.85rem' }}>{u.email}</td>
                            <td>
                              <span className={`admin-badge ${u.role === 'admin' ? 'admin-badge--purple' : 'admin-badge--gray'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>
                              {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td>
                              {u.role !== 'admin' && (
                                <button className="admin-action-btn admin-action-btn--delete"
                                  onClick={() => handleDelete('users', u._id, u.name)}>
                                  🗑️
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── BOOKINGS ── */}
              {activeTab === 'bookings' && (
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">
                      All Bookings ({bookings.length})
                      {stats?.pendingBookings > 0 && (
                        <span className="admin-messages-unread-chip">{stats.pendingBookings} pending</span>
                      )}
                    </h2>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="admin-empty-state">
                      <div className="admin-empty-state__icon">🗓️</div>
                      <h3>No bookings yet</h3>
                      <p>When visitors plan trips through the site, bookings will appear here.</p>
                    </div>
                  ) : (
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Traveler</th>
                            <th>Destination</th>
                            <th>Travel Date</th>
                            <th>People</th>
                            <th>Amount</th>
                            <th>Payment ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map(b => (
                            <tr key={b._id}>
                              <td>
                                <code style={{ fontSize: '0.75rem', color: 'var(--orange-700)', background: 'var(--orange-50)', padding: '3px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>
                                  {b.bookingId}
                                </code>
                              </td>
                              <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                  <span className="admin-table__name" style={{ fontSize: '0.85rem' }}>{b.name}</span>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--neutral-400)' }}>{b.email}</span>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--neutral-400)' }}>{b.phone}</span>
                                </div>
                              </td>
                              <td>
                                <span className="admin-tag">{b.destinationName}</span>
                              </td>
                              <td style={{ fontSize: '0.82rem', color: 'var(--neutral-600)' }}>
                                {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--neutral-700)' }}>
                                {b.numberOfPeople}
                              </td>
                              <td style={{ fontWeight: 700, color: 'var(--orange-700)', fontSize: '0.88rem' }}>
                                ₹{(b.amount || 0).toLocaleString('en-IN')}
                              </td>
                              <td>
                                <code style={{ fontSize: '0.72rem', color: 'var(--neutral-600)', background: 'var(--neutral-100)', padding: '3px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>
                                  {b.paymentId}
                                </code>
                              </td>
                              <td>
                                <span className={`admin-badge ${
                                  b.paymentStatus === 'confirmed'
                                    ? 'admin-badge--green'
                                    : 'admin-badge--booking-pending'
                                }`}>
                                  {b.paymentStatus === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                                </span>
                              </td>
                              <td>
                                <div className="admin-actions">
                                  {b.paymentStatus !== 'confirmed' && (
                                    <button
                                      className="admin-action-btn admin-action-btn--confirm"
                                      onClick={() => handleConfirmPayment(b._id)}
                                      title="Confirm Payment"
                                    >
                                      ✅
                                    </button>
                                  )}
                                  <button
                                    className="admin-action-btn admin-action-btn--delete"
                                    onClick={() => handleDelete('bookings', b._id, `booking ${b.bookingId}`)}
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ── MESSAGES ── */}
              {activeTab === 'messages' && (
                <div className="admin-section">
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">
                      Inbox ({messages.length})
                      {stats?.unreadMessages > 0 && (
                        <span className="admin-messages-unread-chip">{stats.unreadMessages} unread</span>
                      )}
                    </h2>
                  </div>
                  {messages.length === 0 ? (
                    <div className="admin-empty-state">
                      <div className="admin-empty-state__icon">📭</div>
                      <h3>No messages yet</h3>
                      <p>When visitors submit the contact form, messages will appear here.</p>
                    </div>
                  ) : (
                    <div className="admin-messages-list">
                      {messages.map(msg => (
                        <div
                          key={msg._id}
                          className={`admin-msg-card ${!msg.read ? 'admin-msg-card--unread' : ''} ${expandedMsg === msg._id ? 'admin-msg-card--expanded' : ''}`}
                        >
                          <div className="admin-msg-card__header" onClick={() => {
                            if (!msg.read) handleMarkRead(msg._id);
                            setExpandedMsg(expandedMsg === msg._id ? null : msg._id);
                          }}>
                            <div className="admin-msg-card__sender">
                              <div className="admin-msg-card__avatar">{msg.name?.[0]?.toUpperCase()}</div>
                              <div className="admin-msg-card__sender-info">
                                <div className="admin-msg-card__name">
                                  {msg.name}
                                  {!msg.read && <span className="admin-msg-unread-dot" />}
                                </div>
                                <div className="admin-msg-card__email">{msg.email}</div>
                              </div>
                            </div>
                            <div className="admin-msg-card__meta">
                              {msg.subject && (
                                <span className="admin-msg-card__subject">{msg.subject}</span>
                              )}
                              <span className="admin-msg-card__time">
                                {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          {expandedMsg === msg._id && (
                            <div className="admin-msg-card__body">
                              <p className="admin-msg-card__text">{msg.message}</p>
                              <div className="admin-msg-card__actions">
                                <a href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                                  className="admin-btn-sm admin-btn-reply" target="_blank" rel="noreferrer">
                                  ✉️ Reply via Email
                                </a>
                                <button
                                  className="admin-action-btn admin-action-btn--delete"
                                  onClick={() => handleDelete('messages', msg._id, `message from ${msg.name}`)}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
