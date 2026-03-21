import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import generateTripPlan from '../utils/tripPlannerLogic';

const internationalTrips = [
  {
    id: 1,
    name: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300&fit=crop",
    rating: 4.9,
    duration: "7 Days",
    price: "$2,499",
  },
  {
    id: 2,
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    rating: 4.8,
    duration: "5 Days",
    price: "$1,899",
  },
  {
    id: 3,
    name: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
    rating: 4.7,
    duration: "6 Days",
    price: "$1,299",
  },
];

const indiaTrips = [
  {
    id: 4,
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
    rating: 4.5,
    duration: "3 Days",
    price: "₹12,999",
  },
  {
    id: 5,
    name: "Banaras",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop",
    rating: 4.6,
    duration: "4 Days",
    price: "₹9,999",
  },
  {
    id: 6,
    name: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
    rating: 4.8,
    duration: "2 Days",
    price: "₹7,499",
  },
];

const availableTrips = [
  {
    title: 'Goa Beach Escape',
    location: 'Goa, India',
    duration: '3 Days',
    price: '₹7,999',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=60',
    tag: 'Trending',
  },
  {
    title: 'Himalayan Adventure',
    location: 'Manali, India',
    duration: '5 Days',
    price: '₹12,499',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60',
    tag: 'Adventure',
  },
  {
    title: 'Royal Rajasthan Tour',
    location: 'Jaipur, India',
    duration: '4 Days',
    price: '₹9,999',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=60',
    tag: 'Cultural',
  },
];

const preferenceOptions = ['Adventure', 'Relaxation', 'Food', 'Nightlife', 'Culture'];

const initialFormState = {
  destination: '',
  days: '',
  budget: '',
  preferences: [],
};

const ExploreTrips = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const sidebarRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [modalError, setModalError] = useState('');
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [availableLoading, setAvailableLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAvailableLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Explore Trips", icon: "🌍", active: true },
    { label: "My Trips", icon: "✈️" },
    { label: "Calendar Sync", icon: "📅" },
    { label: "Travel Buddies", icon: "👥" },
    { label: "AI Planner", icon: "🤖" },
    { label: "Account Settings", icon: "⚙️" },
    { label: "Help & Support", icon: "❓" },
  ];

  const handlePlanTrip = (destination) => {
    setFormData({ ...initialFormState, destination });
    setModalError('');
    setModalOpen(true);
  };

  const closeModal = (force = false) => {
    if (!force && loadingPlan) return;
    setModalOpen(false);
    setFormData(initialFormState);
    setModalError('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePreference = (option) => {
    setFormData((prev) => {
      const alreadySelected = prev.preferences.includes(option);
      return {
        ...prev,
        preferences: alreadySelected
          ? prev.preferences.filter((item) => item !== option)
          : [...prev.preferences, option],
      };
    });
  };

  const handleGeneratePlan = async (event) => {
    event.preventDefault();
    if (loadingPlan) return;

    if (!formData.destination || !formData.days || !formData.budget || formData.preferences.length === 0) {
      setModalError('Please fill every field and choose at least one preference.');
      return;
    }

    setLoadingPlan(true);
    setModalError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const plan = generateTripPlan({
        destination: formData.destination,
        days: Number(formData.days),
        budget: Number(formData.budget),
        preferences: formData.preferences,
      });

      sessionStorage.setItem('aiPlanStructured', JSON.stringify(plan));
      closeModal(true);
      navigate('/ai-planner');
    } catch (error) {
      setModalError(error.message || 'Unable to generate plan right now.');
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <div className="et-root">
      <style>{`
        .et-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f6f6 0%, #d4eded 100%);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .et-sidebar {
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

        .et-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 10px 22px;
                    <button
                      className="et-card-btn"
                      onClick={() => handlePlanTrip(trip.name)}
                    >
                      Plan Trip
                    </button>
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          display: grid;
          place-items: center;
          font-size: 1.5rem;
          color: #fff;
          font-weight: 700;
        }

        .et-sidebar-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .et-sidebar-role {
          color: rgba(255,255,255,0.7);
          font-size: 0.82rem;
        }

        .et-sidebar-menu-item {
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

        .et-sidebar-menu-item:hover {
          background: rgba(255,255,255,0.12);
          transform: translateX(4px);
        }

        .et-sidebar-menu-item.active {
          background: rgba(255,255,255,0.22);
          color: #fff;
        }

        .et-sidebar-logout {
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

        .et-sidebar-logout:hover {
          background: rgba(255,255,255,0.1);
        }

        .et-main {
          flex: 1;
          margin-left: 260px;
          padding: 28px 36px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .et-header {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .et-back-btn {
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

        .et-back-btn:hover {
          background: #e6f7f7;
          transform: translateY(-2px);
        }

        .et-hamburger {
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

        .et-page-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0;
        }

        .et-search-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
          flex-wrap: wrap;
        }

        .et-search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.08);
          min-width: 260px;
        }

        .et-search-box input {
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #333;
          background: transparent;
          flex: 1;
        }

        .et-search-box input::placeholder {
          color: #999;
        }

        .et-filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, #0d7377, #14a3a8);
          color: #fff;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(13, 115, 119, 0.22);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .et-filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(13, 115, 119, 0.28);
        }

        .et-section {
          background: #fff;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 32px rgba(13, 115, 119, 0.08);
        }

        .et-available-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }

        .et-available-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(15, 118, 110, 0.12);
          transition: transform 220ms ease, box-shadow 220ms ease;
          display: flex;
          flex-direction: column;
        }

        .et-available-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(15, 118, 110, 0.2);
        }

        .et-available-card-media {
          position: relative;
        }

        .et-available-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .et-available-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(15, 118, 110, 0.9);
          color: white;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .et-available-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .et-available-title {
          margin: 0;
          font-size: 1.1rem;
          color: #0f172a;
        }

        .et-available-location {
          color: #0f766e;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .et-available-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #475569;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .et-available-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .et-available-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f766e;
        }

        .et-available-plan {
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: white;
          padding: 10px 20px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(15, 118, 110, 0.25);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .et-available-plan:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(15, 118, 110, 0.3);
        }

        .et-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }

        .et-skeleton-card {
          height: 260px;
          border-radius: 20px;
          background: linear-gradient(120deg, #eef5f5, #f6fbfb, #eef5f5);
          background-size: 200% 200%;
          animation: shimmer 1.5s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .et-section-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0 0 20px;
        }

        .et-loading-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 20px;
          color: #888;
        }

        .et-spinner {
          width: 44px;
          height: 44px;
          border: 4px solid rgba(13, 115, 119, 0.18);
          border-top-color: #0d7377;
          border-radius: 50%;
          animation: etSpin 0.9s linear infinite;
        }

        @keyframes etSpin {
          to { transform: rotate(360deg); }
        }

        .et-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
        }

        .et-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 6px 22px rgba(13, 115, 119, 0.1);
          transition: transform 260ms ease, box-shadow 260ms ease;
          position: relative;
        }

        .et-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 36px rgba(13, 115, 119, 0.16);
        }

        .et-card-img {
          width: 100%;
          height: 170px;
          object-fit: cover;
        }

        .et-card-heart {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          display: grid;
          place-items: center;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 180ms ease;
        }

        .et-card-heart:hover {
          transform: scale(1.1);
        }

        .et-card-heart.active {
          color: #e74c3c;
        }

        .et-card-body {
          padding: 18px;
        }

        .et-card-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0a5c5e;
          margin: 0 0 8px;
        }

        .et-card-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.88rem;
          color: #666;
          margin-bottom: 14px;
        }

        .et-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #f5a623;
          font-weight: 600;
        }

        .et-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .et-card-price {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0d7377;
        }

        .et-card-btn {
          padding: 10px 20px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, #0d7377, #14a3a8);
          color: #fff;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13, 115, 119, 0.22);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .et-card-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(13, 115, 119, 0.28);
        }

        .et-plan-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 220ms ease forwards;
          z-index: 120;
        }

        .et-plan-modal {
          background: #ffffff;
          width: min(520px, 100%);
          border-radius: 28px;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.25);
          padding: 28px;
          animation: scaleIn 220ms ease forwards;
        }

        .et-plan-modal h3 {
          margin: 0 0 6px;
          color: #0f172a;
          font-size: 1.35rem;
        }

        .et-plan-modal p {
          margin: 0 0 18px;
          color: #475569;
        }

        .et-plan-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .et-plan-form label {
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
          display: block;
        }

        .et-plan-form input {
          width: 100%;
          border-radius: 14px;
          border: 1px solid #d0d7e6;
          padding: 12px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }

        .et-plan-form input:focus {
          border-color: #0f766e;
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
        }

        .et-plan-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .et-plan-chip {
          border-radius: 999px;
          border: 1px solid #b8d8d6;
          padding: 8px 16px;
          background: #f8fbfb;
          cursor: pointer;
          transition: all 180ms ease;
          color: #0f172a;
        }

        .et-plan-chip.active {
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 10px 22px rgba(15, 118, 110, 0.25);
        }

        .et-plan-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 4px;
        }

        .et-plan-btn {
          border-radius: 999px;
          border: none;
          padding: 10px 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .et-plan-btn.secondary {
          background: #e2e8f0;
          color: #0f172a;
        }

        .et-plan-btn.primary {
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: white;
          box-shadow: 0 12px 30px rgba(15, 118, 110, 0.35);
        }

        .et-plan-error {
          color: #b91c1c;
          font-size: 0.9rem;
        }

        .et-plan-loader {
          font-size: 0.9rem;
          color: #0f766e;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: translateY(20px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .et-overlay {
          display: none;
        }

        @media (max-width: 900px) {
          .et-sidebar {
            transform: translateX(-100%);
          }

          .et-sidebar.open {
            transform: translateX(0);
          }

          .et-main {
            margin-left: 0;
            padding: 20px 18px 32px;
          }

          .et-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .et-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
            transition: opacity 240ms ease;
          }

          .et-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .et-search-row {
            margin-left: 0;
            width: 100%;
            margin-top: 14px;
          }

          .et-search-box {
            flex: 1;
            min-width: 0;
          }
        }

        @media (max-width: 600px) {
          .et-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .et-page-title {
            font-size: 1.4rem;
          }

          .et-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Overlay for mobile sidebar */}
      <div
        className={`et-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`et-sidebar ${sidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <div className="et-sidebar-profile">
          <div className="et-sidebar-avatar">V</div>
          <div>
            <div className="et-sidebar-name">Vikas</div>
            <div className="et-sidebar-role">Traveller</div>
          </div>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`et-sidebar-menu-item ${item.active ? "active" : ""}`}
            onClick={() => {
              if (item.label === "Dashboard") navigate("/dashboard");
              if (item.label === "Account Settings") navigate("/account-settings");
              setSidebarOpen(false);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button className="et-sidebar-logout">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="et-main">
        {/* Header */}
        <header className="et-header">
          <button
            className="et-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <button className="et-back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>

          <h1 className="et-page-title">Explore Trips</h1>

          <div className="et-search-row">
            <div className="et-search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search trips, destinations..." />
            </div>
            <button className="et-filter-btn">
              <span>⚙️</span>
              Filters
            </button>
          </div>
        </header>

        {/* Available Trips - Loading */}
        <section className="et-section">
          <h2 className="et-section-title">Available Trips</h2>
          {availableLoading ? (
            <div className="et-skeleton-grid" aria-label="Loading trips">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="et-skeleton-card" />
              ))}
            </div>
          ) : availableTrips.length ? (
            <div className="et-available-grid">
              {availableTrips.map((trip) => (
                <AvailableTripCard key={trip.title} trip={trip} onPlan={handlePlanTrip} />
              ))}
            </div>
          ) : (
            <div className="et-loading-area">
              <span>No trips available right now. Try exploring destinations!</span>
            </div>
          )}
        </section>

        {/* International Destinations */}
        <section className="et-section">
          <h2 className="et-section-title">International Destinations</h2>
          <div className="et-grid">
            {internationalTrips.map((trip) => (
              <article key={trip.id} className="et-card">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="et-card-img"
                />
                <button
                  className={`et-card-heart ${favorites.includes(trip.id) ? "active" : ""}`}
                  onClick={() => toggleFavorite(trip.id)}
                  aria-label="Add to favorites"
                >
                  {favorites.includes(trip.id) ? "❤️" : "🤍"}
                </button>
                <div className="et-card-body">
                  <h3 className="et-card-name">{trip.name}</h3>
                  <div className="et-card-meta">
                    <span className="et-card-rating">⭐ {trip.rating}</span>
                    <span>📅 {trip.duration}</span>
                  </div>
                  <div className="et-card-footer">
                    <span className="et-card-price">{trip.price}</span>
                    <button
                      className="et-card-btn"
                      onClick={() => handlePlanTrip(trip.name)}
                    >
                      Plan Trip
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Popular in India */}
        <section className="et-section">
          <h2 className="et-section-title">Popular in India</h2>
          <div className="et-grid">
            {indiaTrips.map((trip) => (
              <article key={trip.id} className="et-card">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="et-card-img"
                />
                <button
                  className={`et-card-heart ${favorites.includes(trip.id) ? "active" : ""}`}
                  onClick={() => toggleFavorite(trip.id)}
                  aria-label="Add to favorites"
                >
                  {favorites.includes(trip.id) ? "❤️" : "🤍"}
                </button>
                <div className="et-card-body">
                  <h3 className="et-card-name">{trip.name}</h3>
                  <div className="et-card-meta">
                    <span className="et-card-rating">⭐ {trip.rating}</span>
                    <span>📅 {trip.duration}</span>
                  </div>
                  <div className="et-card-footer">
                    <span className="et-card-price">{trip.price}</span>
                    <button
                      className="et-card-btn"
                      onClick={() => handlePlanTrip(trip.name)}
                    >
                      Plan Trip
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <PlanTripModal
        open={modalOpen}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleGeneratePlan}
        onInputChange={handleInputChange}
        onTogglePreference={togglePreference}
        loading={loadingPlan}
        error={modalError}
      />
    </div>
  );
};

const AvailableTripCard = ({ trip, onPlan }) => (
  <article className="et-available-card">
    <div className="et-available-card-media">
      <img src={trip.image} alt={trip.title} loading="lazy" />
      <span className="et-available-badge">{trip.tag}</span>
    </div>
    <div className="et-available-body">
      <span className="et-available-location">{trip.location}</span>
      <h3 className="et-available-title">{trip.title}</h3>
      <div className="et-available-meta">
        <span>📅 {trip.duration}</span>
        <span>⭐ {trip.rating}</span>
      </div>
      <div className="et-available-footer">
        <span className="et-available-price">{trip.price}</span>
        <button
          type="button"
          className="et-available-plan"
          onClick={() => onPlan(trip.location || trip.title)}
        >
          Plan Trip
        </button>
      </div>
    </div>
  </article>
);

const PlanTripModal = ({
  open,
  formData,
  onClose,
  onSubmit,
  onInputChange,
  onTogglePreference,
  loading,
  error,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="et-plan-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="et-plan-modal" onClick={(event) => event.stopPropagation()}>
        <h3>Plan Your Trip to {formData.destination || '...'}</h3>
        <p>Customize days, budget, and vibe to get a personalised TripPilot plan.</p>

        <form className="et-plan-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="destination">Destination</label>
            <input
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={onInputChange}
              placeholder="e.g., Goa"
              required
            />
          </div>

          <div>
            <label htmlFor="days">Number of Days</label>
            <input
              id="days"
              name="days"
              type="number"
              min="1"
              value={formData.days}
              onChange={onInputChange}
              placeholder="Enter days"
              required
            />
          </div>

          <div>
            <label htmlFor="budget">Budget (INR)</label>
            <input
              id="budget"
              name="budget"
              type="number"
              min="1000"
              step="500"
              value={formData.budget}
              onChange={onInputChange}
              placeholder="Total budget"
              required
            />
          </div>

          <div>
            <label>Preferences</label>
            <div className="et-plan-chips">
              {preferenceOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`et-plan-chip ${formData.preferences.includes(option) ? 'active' : ''}`}
                  onClick={() => onTogglePreference(option)}
                  aria-pressed={formData.preferences.includes(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="et-plan-error">{error}</p>}
          {loading && <p className="et-plan-loader">Generating your trip...</p>}

          <div className="et-plan-footer">
            <button type="button" className="et-plan-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="et-plan-btn primary" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExploreTrips;
