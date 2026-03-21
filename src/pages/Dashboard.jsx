import React from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const statsData = [
    { label: 'Total Trips', value: '24', icon: '✈️', color: '#e0f7f5' },
    { label: 'Travel Buddies', value: '12', icon: '👥', color: '#e8f4fd' },
    { label: 'Saved Amount', value: '$2,340', icon: '💰', color: '#fef3e2' },
    { label: 'Upcoming Holidays', value: '3', icon: '🎉', color: '#f3e8fd' },
  ];

  const recommendedPlaces = [
    { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d3c6028d?w=300&h=200&fit=crop', rating: '4.9' },
    { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&fit=crop', rating: '4.8' },
    { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop', rating: '4.9' },
  ];

  return (
    <>
      <style>{`
        .dash-root {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          background: linear-gradient(145deg, #e8f6f5 0%, #f0faf9 50%, #f7fcfc 100%);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .dash-sidebar {
          width: 260px;
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #ffffff 0%, #f8fdfd 100%);
          border-radius: 0 32px 32px 0;
          box-shadow: 4px 0 30px rgba(16, 123, 122, 0.08);
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 200;
          transition: transform 300ms ease;
        }

        .dash-sidebar-overlay {
          display: none;
        }

        .dash-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 12px;
          background: linear-gradient(135deg, rgba(16, 123, 122, 0.08), rgba(37, 171, 156, 0.05));
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .dash-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #178f89, #22b8a5);
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 1.3rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(23, 143, 137, 0.3);
        }

        .dash-profile-info h4 {
          margin: 0;
          font-size: 0.95rem;
          color: #0a3d3d;
          font-weight: 600;
        }

        .dash-profile-info p {
          margin: 2px 0 0;
          font-size: 0.78rem;
          color: #6b9292;
        }

        .dash-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dash-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          border: 0;
          background: transparent;
          color: #3a6b6b;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 200ms ease, color 200ms ease, transform 200ms ease;
          text-align: left;
          width: 100%;
        }

        .dash-menu-item:hover {
          background: rgba(23, 143, 137, 0.08);
          color: #178f89;
          transform: translateX(4px) scale(1.02);
        }

        .dash-menu-item.active {
          background: linear-gradient(120deg, rgba(23, 143, 137, 0.14), rgba(34, 184, 165, 0.1));
          color: #178f89;
          font-weight: 600;
        }

        .dash-menu-item span:first-child {
          font-size: 1.1rem;
        }

        .dash-logout {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 0;
          background: rgba(220, 53, 69, 0.08);
          color: #dc3545;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 200ms ease;
          width: 100%;
        }

        .dash-logout:hover {
          background: rgba(220, 53, 69, 0.14);
        }

        .dash-main {
          flex: 1;
          margin-left: 0;
          padding: 24px 28px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dash-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dash-back-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 0;
          background: #fff;
          box-shadow: 0 4px 14px rgba(16, 123, 122, 0.1);
          display: grid;
          place-items: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: box-shadow 200ms ease, transform 200ms ease;
        }

        .dash-back-btn:hover {
          box-shadow: 0 6px 20px rgba(16, 123, 122, 0.16);
          transform: translateY(-1px);
        }

        .dash-hamburger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 0;
          background: linear-gradient(120deg, #178f89, #22b8a5);
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .dash-search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          box-shadow: 0 4px 16px rgba(16, 123, 122, 0.08);
          flex: 1;
          max-width: 400px;
        }

        .dash-search-box input {
          border: 0;
          outline: 0;
          flex: 1;
          font-size: 0.9rem;
          color: #0a3d3d;
          background: transparent;
        }

        .dash-search-box input::placeholder {
          color: #8cb8b8;
        }

        .dash-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dash-notif-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 0;
          background: #fff;
          box-shadow: 0 4px 14px rgba(16, 123, 122, 0.1);
          display: grid;
          place-items: center;
          font-size: 1.1rem;
          cursor: pointer;
          position: relative;
          transition: box-shadow 200ms ease;
        }

        .dash-notif-btn:hover {
          box-shadow: 0 6px 20px rgba(16, 123, 122, 0.16);
        }

        .dash-notif-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 10px;
          height: 10px;
          background: #dc3545;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .dash-greeting {
          background: linear-gradient(135deg, #fff 0%, #f8fdfd 100%);
          border-radius: 24px;
          padding: 28px 32px;
          box-shadow: 0 8px 32px rgba(16, 123, 122, 0.08);
        }

        .dash-greeting h2 {
          margin: 0 0 8px;
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          color: #0a3d3d;
          font-weight: 700;
        }

        .dash-greeting p {
          margin: 0;
          color: #6b9292;
          font-size: 0.95rem;
        }

        .dash-actions {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .dash-action-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border-radius: 16px;
          border: 0;
          background: #fff;
          box-shadow: 0 6px 24px rgba(16, 123, 122, 0.08);
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .dash-action-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 32px rgba(16, 123, 122, 0.14);
        }

        .dash-action-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(23, 143, 137, 0.12), rgba(34, 184, 165, 0.08));
          display: grid;
          place-items: center;
          font-size: 1.3rem;
        }

        .dash-action-btn span:last-child {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0a3d3d;
        }

        .dash-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }

        .dash-stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 22px 20px;
          box-shadow: 0 6px 24px rgba(16, 123, 122, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dash-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 1.4rem;
        }

        .dash-stat-card h3 {
          margin: 0;
          font-size: 1.6rem;
          color: #0a3d3d;
          font-weight: 700;
        }

        .dash-stat-card p {
          margin: 0;
          font-size: 0.82rem;
          color: #6b9292;
        }

        .dash-content-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
        }

        .dash-analytics {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dash-analytics-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .dash-insight-card {
          background: #fff;
          border-radius: 20px;
          padding: 22px 20px;
          box-shadow: 0 6px 24px rgba(16, 123, 122, 0.06);
        }

        .dash-insight-card h4 {
          margin: 0 0 12px;
          font-size: 0.9rem;
          color: #0a3d3d;
          font-weight: 600;
        }

        .dash-insight-card p {
          margin: 0;
          font-size: 0.82rem;
          color: #6b9292;
          line-height: 1.5;
        }

        .dash-chart-placeholder {
          height: 100px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(23, 143, 137, 0.08), rgba(34, 184, 165, 0.04));
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          padding: 12px;
          gap: 8px;
        }

        .dash-chart-bar {
          width: 20px;
          border-radius: 6px 6px 0 0;
          background: linear-gradient(180deg, #22b8a5, #178f89);
        }

        .dash-recommended {
          background: #fff;
          border-radius: 24px;
          padding: 22px 20px;
          box-shadow: 0 8px 32px rgba(16, 123, 122, 0.08);
        }

        .dash-recommended h3 {
          margin: 0 0 16px;
          font-size: 1rem;
          color: #0a3d3d;
          font-weight: 700;
        }

        .dash-place-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .dash-place-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px;
          border-radius: 14px;
          background: #f8fdfd;
          transition: background-color 200ms ease, transform 200ms ease;
          cursor: pointer;
        }

        .dash-place-card:hover {
          background: rgba(23, 143, 137, 0.06);
          transform: translateX(4px) scale(1.02);
        }

        .dash-place-img {
          width: 64px;
          height: 50px;
          border-radius: 10px;
          object-fit: cover;
        }

        .dash-place-info h5 {
          margin: 0;
          font-size: 0.88rem;
          color: #0a3d3d;
          font-weight: 600;
        }

        .dash-place-info p {
          margin: 3px 0 0;
          font-size: 0.76rem;
          color: #6b9292;
        }

        @media (max-width: 1100px) {
          .dash-content-grid {
            grid-template-columns: 1fr;
          }

          .dash-recommended {
            order: -1;
          }

          .dash-place-list {
            flex-direction: row;
            overflow-x: auto;
            gap: 12px;
            padding-bottom: 8px;
          }

          .dash-place-card {
            min-width: 200px;
            flex-direction: column;
            align-items: flex-start;
          }

          .dash-place-img {
            width: 100%;
            height: 100px;
          }
        }

        @media (max-width: 900px) {
          .dash-sidebar {
            transform: translateX(-100%);
          }

          .dash-sidebar.open {
            transform: translateX(0);
          }

          .dash-sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(10, 61, 61, 0.3);
            z-index: 190;
            opacity: 0;
            pointer-events: none;
            transition: opacity 300ms ease;
          }

          .dash-sidebar-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .dash-main {
            margin-left: 0;
            padding: 20px 16px 32px;
          }

          .dash-hamburger {
            display: grid;
            place-items: center;
          }

          .dash-search-box {
            max-width: 100%;
            order: 10;
            width: 100%;
            margin-top: 12px;
          }

          .dash-header {
            flex-wrap: wrap;
          }

          .dash-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .dash-actions {
            grid-template-columns: 1fr;
          }

          .dash-action-btn {
            flex-direction: column;
            text-align: center;
            padding: 16px 12px;
          }

          .dash-stats {
            grid-template-columns: 1fr 1fr;
          }

          .dash-greeting {
            padding: 20px 18px;
          }
        }
      `}</style>

      <div className="dash-root">
        <main className="dash-main">
          <header className="dash-header">
            <div className="dash-header-left">
              <button className="dash-back-btn" aria-label="Go back">←</button>
            </div>

            <div className="dash-search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search trips, destinations, buddies..." />
            </div>

            <div className="dash-header-right">
              <button className="dash-notif-btn" aria-label="Notifications">
                🔔
                <span className="dash-notif-badge" />
              </button>
            </div>
          </header>

          <section className="dash-greeting">
            <h2>Hey there, ready for your next adventure? 🌴</h2>
            <p>Plan your perfect trip with AI-powered recommendations and sync with your travel buddies.</p>
          </section>

          <section className="dash-actions">
            <button
              className="dash-action-btn"
              onClick={() => navigate('/ai-planner')}
            >
              <span className="dash-action-icon">🗺️</span>
              <span>Plan New Trip</span>
            </button>
            <button
              className="dash-action-btn"
              onClick={() => navigate('/dashboard/travel-buddies')}
            >
              <span className="dash-action-icon">👥</span>
              <span>Find Travel Buddies</span>
            </button>
            <button
              className="dash-action-btn"
              onClick={() => navigate('/dashboard/calendar-sync')}
            >
              <span className="dash-action-icon">📅</span>
              <span>Sync Calendar</span>
            </button>
            <button
              className="dash-action-btn"
              onClick={() => navigate('/dashboard/explore-trips')}
            >
              <span className="dash-action-icon">🌍</span>
              <span>Explore Destinations</span>
            </button>
          </section>

          <section className="dash-stats">
            {statsData.map((stat, index) => (
              <div className="dash-stat-card" key={index}>
                <div className="dash-stat-icon" style={{ background: stat.color }}>
                  {stat.icon}
                </div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </section>

          <section className="dash-content-grid">
            <div className="dash-analytics">
              <div className="dash-analytics-row">
                <div className="dash-insight-card">
                  <h4>Travel Insights</h4>
                  <div className="dash-chart-placeholder">
                    <div className="dash-chart-bar" style={{ height: '40%' }} />
                    <div className="dash-chart-bar" style={{ height: '70%' }} />
                    <div className="dash-chart-bar" style={{ height: '55%' }} />
                    <div className="dash-chart-bar" style={{ height: '85%' }} />
                    <div className="dash-chart-bar" style={{ height: '60%' }} />
                    <div className="dash-chart-bar" style={{ height: '75%' }} />
                  </div>
                  <p style={{ marginTop: '12px' }}>You've traveled 40% more this year!</p>
                </div>

                <div className="dash-insight-card">
                  <h4>Budget Distribution</h4>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ flex: 3, height: '12px', borderRadius: '6px', background: '#22b8a5' }} />
                    <div style={{ flex: 2, height: '12px', borderRadius: '6px', background: '#fbbf24' }} />
                    <div style={{ flex: 1, height: '12px', borderRadius: '6px', background: '#f87171' }} />
                  </div>
                  <p>Flights: 50% · Hotels: 33% · Activities: 17%</p>
                </div>
              </div>

              <div className="dash-analytics-row">
                <div className="dash-insight-card">
                  <h4>Travel Profile</h4>
                  <p>You prefer beach destinations and adventure activities. AI suggests exploring coastal regions in Southeast Asia.</p>
                </div>

                <div className="dash-insight-card">
                  <h4>Monthly Insights</h4>
                  <p>Best time to book: March–April for summer trips. You can save up to 25% on flights.</p>
                </div>
              </div>
            </div>

            <aside className="dash-recommended">
              <h3>Recommended Places</h3>
              <div className="dash-place-list">
                {recommendedPlaces.map((place, index) => (
                  <div className="dash-place-card" key={index}>
                    <img className="dash-place-img" src={place.image} alt={place.name} />
                    <div className="dash-place-info">
                      <h5>{place.name}</h5>
                      <p>⭐ {place.rating} · AI Pick</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
