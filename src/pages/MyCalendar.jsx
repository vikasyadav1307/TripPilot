import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MyCalendar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthView, setMonthView] = useState("Month View");
  const [freeDays, setFreeDays] = useState([]);
  const sidebarRef = useRef(null);

  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Explore Trips", icon: "🌍" },
    { label: "My Trips", icon: "✈️" },
    { label: "Calendar Sync", icon: "🔗" },
    { label: "My Calendar", icon: "📅", active: true },
    { label: "Travel Buddies", icon: "👥" },
    { label: "AI Planner", icon: "🤖" },
    { label: "Account Settings", icon: "⚙️" },
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // February 2026 calendar data
  const calendarDays = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [null, null, null, null, null, null, null],
  ];

  const today = 26; // Current day

  const statsCards = [
    { label: "Free Days", value: `${freeDays.length}/28`, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
    { label: "Busy", value: `${28 - freeDays.length} days`, color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
    { label: "Available", value: `${Math.round((freeDays.length / 28) * 100)}%`, color: "#0d7377", bg: "rgba(13, 115, 119, 0.1)" },
    { label: "Events", value: "0", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" },
  ];

  const legendItems = [
    { label: "Free dates", color: "#10b981", desc: "Available for travel" },
    { label: "Busy dates", color: "#ef4444", desc: "Not available" },
    { label: "Changing to free", color: "#34d399", desc: "Pending free status" },
    { label: "Changing to busy", color: "#f87171", desc: "Pending busy status" },
    { label: "Today's date", color: "#0d7377", desc: "Current day" },
    { label: "Event (click to view)", color: "#8b5cf6", desc: "Has scheduled event" },
  ];

  const toggleFreeDay = (day) => {
    if (!day) return;
    setSelectedDay(day);
    if (freeDays.includes(day)) {
      setFreeDays(freeDays.filter((d) => d !== day));
    } else {
      setFreeDays([...freeDays, day]);
    }
  };

  return (
    <div className="mc-root">
      <style>{`
        .mc-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f6f6 0%, #d4eded 100%);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .mc-sidebar {
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

        .mc-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 10px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          margin-bottom: 10px;
        }

        .mc-sidebar-avatar {
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

        .mc-sidebar-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .mc-sidebar-role {
          color: rgba(255,255,255,0.7);
          font-size: 0.82rem;
        }

        .mc-sidebar-menu-item {
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

        .mc-sidebar-menu-item:hover {
          background: rgba(255,255,255,0.12);
          transform: translateX(4px);
        }

        .mc-sidebar-menu-item.active {
          background: rgba(255,255,255,0.22);
          color: #fff;
        }

        .mc-sidebar-logout {
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

        .mc-sidebar-logout:hover {
          background: rgba(255,255,255,0.1);
        }

        .mc-main {
          flex: 1;
          margin-left: 260px;
          padding: 28px 36px 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mc-header {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .mc-hamburger {
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

        .mc-back-btn {
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

        .mc-back-btn:hover {
          background: #e6f7f7;
          transform: translateY(-2px);
        }

        .mc-page-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0;
        }

        .mc-header-right {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
        }

        .mc-search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          min-width: 220px;
        }

        .mc-search-box input {
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #333;
          background: transparent;
          flex: 1;
        }

        .mc-search-box input::placeholder {
          color: #999;
        }

        .mc-notif-btn {
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

        .mc-notif-btn:hover {
          box-shadow: 0 6px 20px rgba(13, 115, 119, 0.14);
        }

        .mc-notif-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          background: #dc3545;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .mc-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .mc-title-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mc-title-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0d7377, #14a3a8);
          display: grid;
          place-items: center;
          font-size: 1.4rem;
          color: #fff;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.2);
        }

        .mc-title-text {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0;
        }

        .mc-view-dropdown {
          padding: 10px 20px;
          border-radius: 999px;
          border: 2px solid rgba(13, 115, 119, 0.2);
          background: #fff;
          color: #0d7377;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }

        .mc-view-dropdown:hover {
          border-color: #0d7377;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.12);
        }

        .mc-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .mc-stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 22px 20px;
          box-shadow: 0 6px 24px rgba(13, 115, 119, 0.08);
          text-align: center;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .mc-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 32px rgba(13, 115, 119, 0.14);
        }

        .mc-stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .mc-stat-label {
          font-size: 0.88rem;
          color: #6b9292;
          font-weight: 500;
        }

        .mc-calendar-card {
          background: #fff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 32px rgba(13, 115, 119, 0.08);
        }

        .mc-calendar-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .mc-calendar-nav {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: none;
          background: rgba(13, 115, 119, 0.08);
          color: #0d7377;
          font-size: 1.1rem;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 200ms ease;
        }

        .mc-calendar-nav:hover {
          background: rgba(13, 115, 119, 0.15);
        }

        .mc-calendar-month {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0a5c5e;
          min-width: 180px;
          text-align: center;
        }

        .mc-calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
        }

        .mc-day-header {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: #6b9292;
          padding: 10px 0;
        }

        .mc-day-cell {
          aspect-ratio: 1;
          border-radius: 14px;
          background: #f8fafa;
          display: grid;
          place-items: center;
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 180ms ease;
          box-shadow: 0 2px 8px rgba(13, 115, 119, 0.04);
        }

        .mc-day-cell:hover {
          background: rgba(13, 115, 119, 0.08);
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.12);
        }

        .mc-day-cell.empty {
          background: transparent;
          cursor: default;
          box-shadow: none;
        }

        .mc-day-cell.empty:hover {
          transform: none;
          background: transparent;
        }

        .mc-day-cell.today {
          background: linear-gradient(135deg, #0d7377, #14a3a8);
          color: #fff;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.25);
        }

        .mc-day-cell.selected {
          border-color: #0d7377;
          box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.2);
        }

        .mc-day-cell.free {
          background: rgba(16, 185, 129, 0.15);
          color: #059669;
        }

        .mc-day-cell.free.today {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: #fff;
        }

        .mc-legend-card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(13, 115, 119, 0.08);
        }

        .mc-legend-header {
          background: linear-gradient(120deg, #0d7377, #14a3a8);
          padding: 18px 24px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .mc-legend-content {
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .mc-legend-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mc-legend-dot {
          width: 16px;
          height: 16px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .mc-legend-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
        }

        .mc-legend-desc {
          font-size: 0.78rem;
          color: #6b9292;
        }

        .mc-overlay {
          display: none;
        }

        @media (max-width: 1100px) {
          .mc-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .mc-legend-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .mc-sidebar {
            transform: translateX(-100%);
          }

          .mc-sidebar.open {
            transform: translateX(0);
          }

          .mc-main {
            margin-left: 0;
            padding: 20px 18px 32px;
          }

          .mc-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .mc-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
            transition: opacity 240ms ease;
          }

          .mc-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .mc-header-right {
            margin-left: 0;
            width: 100%;
            margin-top: 14px;
          }

          .mc-search-box {
            flex: 1;
            min-width: 0;
          }
        }

        @media (max-width: 700px) {
          .mc-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .mc-stat-card {
            padding: 16px 14px;
          }

          .mc-stat-value {
            font-size: 1.4rem;
          }

          .mc-calendar-card {
            padding: 18px;
          }

          .mc-calendar-grid {
            gap: 6px;
          }

          .mc-day-cell {
            border-radius: 10px;
            font-size: 0.9rem;
          }

          .mc-legend-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .mc-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .mc-page-title {
            font-size: 1.4rem;
          }

          .mc-title-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .mc-view-dropdown {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* Overlay for mobile sidebar */}
      <div
        className={`mc-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`mc-sidebar ${sidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <div className="mc-sidebar-profile">
          <div className="mc-sidebar-avatar">V</div>
          <div>
            <div className="mc-sidebar-name">Vikas</div>
            <div className="mc-sidebar-role">Traveller</div>
          </div>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`mc-sidebar-menu-item ${item.active ? "active" : ""}`}
            onClick={() => {
              if (item.label === "Dashboard") navigate("/dashboard");
              if (item.label === "Explore Trips") navigate("/dashboard/explore-trips");
              if (item.label === "My Trips") navigate("/dashboard/my-trips");
              if (item.label === "Calendar Sync") navigate("/dashboard/calendar-sync");
              if (item.label === "My Calendar") navigate("/dashboard/my-calendar");
              setSidebarOpen(false);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button className="mc-sidebar-logout">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="mc-main">
        {/* Header */}
        <header className="mc-header">
          <button
            className="mc-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <button className="mc-back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>

          <h1 className="mc-page-title">My Calendar</h1>

          <div className="mc-header-right">
            <div className="mc-search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search..." />
            </div>
            <button className="mc-notif-btn" aria-label="Notifications">
              🔔
              <span className="mc-notif-badge" />
            </button>
          </div>
        </header>

        {/* Title Row */}
        <div className="mc-title-row">
          <div className="mc-title-left">
            <div className="mc-title-icon">📅</div>
            <h2 className="mc-title-text">My Calendar</h2>
          </div>
          <select
            className="mc-view-dropdown"
            value={monthView}
            onChange={(e) => setMonthView(e.target.value)}
          >
            <option>Month View</option>
            <option>Week View</option>
            <option>Day View</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="mc-stats-grid">
          {statsCards.map((card, idx) => (
            <div className="mc-stat-card" key={idx}>
              <div
                className="mc-stat-value"
                style={{ color: card.color }}
              >
                {card.value}
              </div>
              <div className="mc-stat-label">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="mc-calendar-card">
          <div className="mc-calendar-header">
            <button className="mc-calendar-nav">←</button>
            <div className="mc-calendar-month">February 2026</div>
            <button className="mc-calendar-nav">→</button>
          </div>

          <div className="mc-calendar-grid">
            {days.map((day) => (
              <div className="mc-day-header" key={day}>
                {day}
              </div>
            ))}

            {calendarDays.flat().map((day, idx) => {
              const isToday = day === today;
              const isSelected = day === selectedDay;
              const isFree = freeDays.includes(day);
              const isEmpty = day === null;

              return (
                <div
                  key={idx}
                  className={`mc-day-cell ${isEmpty ? "empty" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${isFree && !isToday ? "free" : ""}`}
                  onClick={() => toggleFreeDay(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend Card */}
        <div className="mc-legend-card">
          <div className="mc-legend-header">Legend & Information</div>
          <div className="mc-legend-content">
            {legendItems.map((item, idx) => (
              <div className="mc-legend-item" key={idx}>
                <div
                  className="mc-legend-dot"
                  style={{ background: item.color }}
                />
                <div>
                  <div className="mc-legend-label">{item.label}</div>
                  <div className="mc-legend-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCalendar;
