import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const createdTripsData = [];
const joinedTripsData = [];

const MyTrips = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("created");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const sidebarRef = useRef(null);

  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Explore Trips", icon: "🌍" },
    { label: "My Trips", icon: "✈️", active: true },
    { label: "Calendar Sync", icon: "📅" },
    { label: "Travel Buddies", icon: "👥" },
    { label: "AI Planner", icon: "🤖" },
    { label: "Account Settings", icon: "⚙️" },
    { label: "Help & Support", icon: "❓" },
  ];

  const currentTrips = activeTab === "created" ? createdTripsData : joinedTripsData;

  return (
    <div className="mt-root">
      <style>{`
        .mt-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f6f6 0%, #d4eded 100%);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .mt-sidebar {
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

        .mt-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 10px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          margin-bottom: 10px;
        }

        .mt-sidebar-avatar {
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

        .mt-sidebar-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .mt-sidebar-role {
          color: rgba(255,255,255,0.7);
          font-size: 0.82rem;
        }

        .mt-sidebar-menu-item {
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

        .mt-sidebar-menu-item:hover {
          background: rgba(255,255,255,0.12);
          transform: translateX(4px);
        }

        .mt-sidebar-menu-item.active {
          background: rgba(255,255,255,0.22);
          color: #fff;
        }

        .mt-sidebar-logout {
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

        .mt-sidebar-logout:hover {
          background: rgba(255,255,255,0.1);
        }

        .mt-main {
          flex: 1;
          margin-left: 260px;
          padding: 28px 36px 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mt-header {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .mt-hamburger {
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

        .mt-back-btn {
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

        .mt-back-btn:hover {
          background: #e6f7f7;
          transform: translateY(-2px);
        }

        .mt-page-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0;
        }

        .mt-header-right {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
        }

        .mt-search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          min-width: 220px;
        }

        .mt-search-box input {
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #333;
          background: transparent;
          flex: 1;
        }

        .mt-search-box input::placeholder {
          color: #999;
        }

        .mt-notif-btn {
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

        .mt-notif-btn:hover {
          box-shadow: 0 6px 20px rgba(13, 115, 119, 0.14);
        }

        .mt-notif-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          background: #dc3545;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .mt-tabs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .mt-tabs {
          display: flex;
          gap: 8px;
          background: #fff;
          border-radius: 999px;
          padding: 6px;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
        }

        .mt-tab {
          padding: 12px 24px;
          border-radius: 999px;
          border: none;
          background: transparent;
          color: #6b9292;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease;
        }

        .mt-tab:hover {
          background: rgba(13, 115, 119, 0.06);
        }

        .mt-tab.active {
          background: linear-gradient(120deg, #0d7377, #14a3a8);
          color: #fff;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.22);
        }

        .mt-create-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
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

        .mt-create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13, 115, 119, 0.28);
        }

        .mt-filters-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .mt-filter-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          min-width: 200px;
        }

        .mt-filter-search input {
          border: none;
          outline: none;
          font-size: 0.9rem;
          color: #333;
          background: transparent;
          flex: 1;
        }

        .mt-filter-search input::placeholder {
          color: #999;
        }

        .mt-filter-btn {
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
          transition: box-shadow 200ms ease;
        }

        .mt-filter-btn:hover {
          box-shadow: 0 6px 18px rgba(13, 115, 119, 0.14);
        }

        .mt-dropdown {
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid rgba(13, 115, 119, 0.15);
          background: #fff;
          color: #0a5c5e;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          outline: none;
        }

        .mt-dropdown:focus {
          border-color: #0d7377;
        }

        .mt-content {
          background: #fff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 32px rgba(13, 115, 119, 0.08);
          flex: 1;
        }

        .mt-section-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0 0 24px;
        }

        .mt-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .mt-empty-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(13, 115, 119, 0.1), rgba(20, 163, 168, 0.06));
          display: grid;
          place-items: center;
          font-size: 2.4rem;
          margin-bottom: 20px;
        }

        .mt-empty-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0a5c5e;
          margin: 0 0 8px;
        }

        .mt-empty-subtitle {
          font-size: 0.92rem;
          color: #6b9292;
          margin: 0;
        }

        .mt-trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .mt-trip-card {
          background: #f8fdfd;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(13, 115, 119, 0.08);
          transition: transform 240ms ease, box-shadow 240ms ease;
        }

        .mt-trip-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(13, 115, 119, 0.14);
        }

        .mt-trip-card-img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .mt-trip-card-body {
          padding: 16px;
        }

        .mt-trip-card-name {
          font-size: 1rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0 0 6px;
        }

        .mt-trip-card-meta {
          font-size: 0.82rem;
          color: #6b9292;
          margin: 0;
        }

        .mt-overlay {
          display: none;
        }

        @media (max-width: 900px) {
          .mt-sidebar {
            transform: translateX(-100%);
          }

          .mt-sidebar.open {
            transform: translateX(0);
          }

          .mt-main {
            margin-left: 0;
            padding: 20px 18px 32px;
          }

          .mt-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .mt-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
            transition: opacity 240ms ease;
          }

          .mt-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .mt-header-right {
            margin-left: 0;
            width: 100%;
            margin-top: 14px;
          }

          .mt-search-box {
            flex: 1;
            min-width: 0;
          }
        }

        @media (max-width: 600px) {
          .mt-tabs-row {
            flex-direction: column;
            align-items: stretch;
          }

          .mt-tabs {
            width: 100%;
            justify-content: center;
          }

          .mt-create-btn {
            width: 100%;
            justify-content: center;
          }

          .mt-filters-row {
            flex-direction: column;
            align-items: stretch;
          }

          .mt-filter-search {
            width: 100%;
          }

          .mt-dropdown {
            width: 100%;
          }

          .mt-trips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Overlay for mobile sidebar */}
      <div
        className={`mt-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`mt-sidebar ${sidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <div className="mt-sidebar-profile">
          <div className="mt-sidebar-avatar">V</div>
          <div>
            <div className="mt-sidebar-name">Vikas</div>
            <div className="mt-sidebar-role">Traveller</div>
          </div>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`mt-sidebar-menu-item ${item.active ? "active" : ""}`}
            onClick={() => {
              if (item.label === "Dashboard") navigate("/dashboard");
              if (item.label === "Explore Trips") navigate("/dashboard/explore-trips");
              if (item.label === "My Trips") navigate("/dashboard/my-trips");
              setSidebarOpen(false);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button className="mt-sidebar-logout">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="mt-main">
        {/* Header */}
        <header className="mt-header">
          <button
            className="mt-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <button className="mt-back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>

          <h1 className="mt-page-title">My Trips</h1>

          <div className="mt-header-right">
            <div className="mt-search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search trips..." />
            </div>
            <button className="mt-notif-btn" aria-label="Notifications">
              🔔
              <span className="mt-notif-badge" />
            </button>
          </div>
        </header>

        {/* Tabs Row */}
        <div className="mt-tabs-row">
          <div className="mt-tabs">
            <button
              className={`mt-tab ${activeTab === "created" ? "active" : ""}`}
              onClick={() => setActiveTab("created")}
            >
              Created Trips
            </button>
            <button
              className={`mt-tab ${activeTab === "joined" ? "active" : ""}`}
              onClick={() => setActiveTab("joined")}
            >
              Joined Trips
            </button>
          </div>

          <button
            className="mt-create-btn"
            onClick={() => navigate("/dashboard/planner")}
          >
            + Create Trip
          </button>
        </div>

        {/* Filters Row */}
        <div className="mt-filters-row">
          <div className="mt-filter-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="mt-filter-btn" aria-label="Filters">
            ⚙️
          </button>

          <select
            className="mt-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className="mt-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* Content Area */}
        <section className="mt-content">
          <h2 className="mt-section-title">
            {activeTab === "created" ? "Your Created Trips" : "Trips You Joined"}
          </h2>

          {currentTrips.length === 0 ? (
            <div className="mt-empty-state">
              <div className="mt-empty-icon">
                {activeTab === "created" ? "🗺️" : "✈️"}
              </div>
              <h3 className="mt-empty-title">
                No trips found matching your criteria
              </h3>
              <p className="mt-empty-subtitle">Start a new adventure</p>
            </div>
          ) : (
            <div className="mt-trips-grid">
              {currentTrips.map((trip) => (
                <div key={trip.id} className="mt-trip-card">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="mt-trip-card-img"
                  />
                  <div className="mt-trip-card-body">
                    <h4 className="mt-trip-card-name">{trip.name}</h4>
                    <p className="mt-trip-card-meta">
                      {trip.date} · {trip.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyTrips;
