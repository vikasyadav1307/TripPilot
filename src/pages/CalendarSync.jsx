import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CalendarSync = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Explore Trips", icon: "🌍" },
    { label: "My Trips", icon: "✈️" },
    { label: "Calendar Sync", icon: "📅", active: true },
    { label: "Travel Buddies", icon: "👥" },
    { label: "AI Planner", icon: "🤖" },
    { label: "Account Settings", icon: "⚙️" },
    { label: "Help & Support", icon: "❓" },
  ];

  return (
    <div className="cs-root">
      <style>{`
        .cs-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f6f6 0%, #d4eded 100%);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .cs-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #0d7377 0%, #14a3a8 100%);
          border-radius: 0 32px 32px 0;
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
          box-shadow: 4px 0 24px rgba(13, 115, 119, 0.18);
          transition: transform 280ms ease;
        }

        .cs-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 10px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          margin-bottom: 10px;
        }

        .cs-sidebar-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          display: grid;
          place-items: center;
          font-size: 1.5rem;
          color: #fff;
          font-weight: 700;
        }

        .cs-sidebar-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .cs-sidebar-role {
          color: rgba(255,255,255,0.7);
          font-size: 0.82rem;
        }

        .cs-sidebar-menu-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          border-radius: 14px;
          color: rgba(255,255,255,0.88);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: background 180ms ease, transform 180ms ease;
        }

        .cs-sidebar-menu-item:hover {
          background: rgba(255,255,255,0.12);
          transform: translateX(4px);
        }

        .cs-sidebar-menu-item.active {
          background: rgba(255,255,255,0.22);
          color: #fff;
        }

        .cs-sidebar-logout {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          border-radius: 14px;
          color: rgba(255,255,255,0.8);
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: background 180ms ease;
        }

        .cs-sidebar-logout:hover {
          background: rgba(255,255,255,0.1);
        }

        .cs-main {
          flex: 1;
          margin-left: 260px;
          padding: 28px 36px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .cs-header {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .cs-hamburger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: none;
          background: #fff;
          color: #0d7377;
          font-size: 1.3rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.12);
        }

        .cs-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          background: #fff;
          color: #0d7377;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.12);
          transition: background 200ms ease, transform 200ms ease;
        }

        .cs-back-btn:hover {
          background: #e6f7f7;
          transform: translateY(-2px);
        }

        .cs-page-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0;
        }

        .cs-header-right {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
        }

        .cs-search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          min-width: 220px;
        }

        .cs-search-box input {
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #333;
          background: transparent;
          flex: 1;
        }

        .cs-search-box input::placeholder {
          color: #999;
        }

        .cs-notif-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: none;
          background: #fff;
          display: grid;
          place-items: center;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          position: relative;
          transition: box-shadow 200ms ease;
        }

        .cs-notif-btn:hover {
          box-shadow: 0 6px 20px rgba(13, 115, 119, 0.14);
        }

        .cs-notif-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          background: #dc3545;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .cs-top-card {
          background: #fff;
          border-radius: 24px;
          padding: 28px 32px;
          box-shadow: 0 8px 32px rgba(13, 115, 119, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .cs-top-card-content h3 {
          margin: 0 0 8px;
          font-size: 1.2rem;
          font-weight: 700;
          color: #0a5c5e;
        }

        .cs-top-card-content p {
          margin: 0;
          font-size: 0.92rem;
          color: #6b9292;
        }

        .cs-connect-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, #0d7377, #14a3a8);
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(13, 115, 119, 0.22);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .cs-connect-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13, 115, 119, 0.28);
        }

        .cs-empty-card {
          background: #fff;
          border-radius: 24px;
          padding: 60px 40px;
          box-shadow: 0 8px 32px rgba(13, 115, 119, 0.08);
          border: 2px dashed rgba(13, 115, 119, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex: 1;
        }

        .cs-empty-icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(13, 115, 119, 0.12), rgba(20, 163, 168, 0.08));
          display: grid;
          place-items: center;
          font-size: 3rem;
          margin-bottom: 28px;
        }

        .cs-empty-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0 0 14px;
        }

        .cs-empty-text {
          font-size: 1rem;
          color: #6b9292;
          margin: 0 0 28px;
          max-width: 440px;
          line-height: 1.6;
        }

        .cs-overlay {
          display: none;
        }

        @media (max-width: 900px) {
          .cs-sidebar {
            transform: translateX(-100%);
          }

          .cs-sidebar.open {
            transform: translateX(0);
          }

          .cs-main {
            margin-left: 0;
            padding: 20px 18px 32px;
          }

          .cs-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .cs-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
            transition: opacity 240ms ease;
          }

          .cs-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .cs-header-right {
            margin-left: 0;
            width: 100%;
            margin-top: 14px;
          }

          .cs-search-box {
            flex: 1;
            min-width: 0;
          }

          .cs-top-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .cs-connect-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .cs-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .cs-page-title {
            font-size: 1.4rem;
          }

          .cs-empty-card {
            padding: 40px 20px;
          }

          .cs-empty-icon {
            width: 80px;
            height: 80px;
            font-size: 2.4rem;
          }

          .cs-empty-title {
            font-size: 1.2rem;
          }

          .cs-empty-text {
            font-size: 0.92rem;
          }
        }
      `}</style>

      {/* Overlay for mobile sidebar */}
      <div
        className={`cs-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`cs-sidebar ${sidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <div className="cs-sidebar-profile">
          <div className="cs-sidebar-avatar">V</div>
          <div>
            <div className="cs-sidebar-name">Vikas</div>
            <div className="cs-sidebar-role">Traveller</div>
          </div>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`cs-sidebar-menu-item ${item.active ? "active" : ""}`}
            onClick={() => {
              if (item.label === "Dashboard") navigate("/dashboard");
              if (item.label === "Explore Trips") navigate("/dashboard/explore-trips");
              if (item.label === "My Trips") navigate("/dashboard/my-trips");
              if (item.label === "Calendar Sync") navigate("/dashboard/calendar-sync");
              if (item.label === "Account Settings") {
                console.log('Account Settings clicked');
                navigate('/account-settings');
              }
              setSidebarOpen(false);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button className="cs-sidebar-logout">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="cs-main">
        {/* Header */}
        <header className="cs-header">
          <button
            className="cs-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <button className="cs-back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>

          <h1 className="cs-page-title">Calendar Sync</h1>

          <div className="cs-header-right">
            <div className="cs-search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search..." />
            </div>
            <button className="cs-notif-btn" aria-label="Notifications">
              🔔
              <span className="cs-notif-badge" />
            </button>
          </div>
        </header>

        {/* Top Card */}
        <div className="cs-top-card">
          <div className="cs-top-card-content">
            <h3>Connect Google Calendar</h3>
            <p>Connect your Google account to sync calendar events</p>
          </div>
          <button
            className="cs-connect-btn"
            onClick={() => navigate("/dashboard")}
          >
            📅 Connect Google Calendar
          </button>
        </div>

        {/* Empty State Card */}
        <div className="cs-empty-card">
          <div className="cs-empty-icon">📅</div>
          <h2 className="cs-empty-title">Connect Your Google Calendar</h2>
          <p className="cs-empty-text">
            Sync your Google Calendar to share your availability with friends and get smart recommendations for the perfect travel dates.
          </p>
          <button
            className="cs-connect-btn"
            onClick={() => navigate("/dashboard")}
          >
            📅 Connect Google Calendar
          </button>
        </div>
      </main>
    </div>
  );
};

export default CalendarSync;
