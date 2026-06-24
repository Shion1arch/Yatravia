import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-icon">🗺️</span>
        <h1 className="not-found-title">404 — Path Lost in the Clouds</h1>
        <p className="not-found-desc">
          We couldn't find the page you are looking for. It might have moved or doesn't exist.
        </p>
        <Link to="/" className="btn-primary not-found-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
