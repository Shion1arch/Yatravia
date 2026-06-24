import './StatsSection.css';

const stats = [
  { value: '340m', label: 'Nohkalikai Falls Drop', icon: '💧' },
  { value: '11,872mm', label: 'Annual Rainfall (Mawsynram)', icon: '🌧️' },
  { value: '3', label: 'Distinct Hill Regions', icon: '⛰️' },
  { value: '2.8M', label: 'Annual Visitors', icon: '🧳' },
];

export default function StatsSection() {
  return (
    <section className="stats-section" id="stats-section">
      <div className="container">
        <div className="stats-section__grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="stat-item__icon">{stat.icon}</div>
              <div className="stat-item__value">{stat.value}</div>
              <div className="stat-item__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
