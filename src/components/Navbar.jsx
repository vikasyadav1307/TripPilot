import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleScrollTo = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .tp-nav-root {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }

        .tp-navbar {
          position: sticky;
          top: 16px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 20px;
          border-radius: 999px;
          background: linear-gradient(120deg, rgba(16, 123, 122, 0.97), rgba(37, 171, 156, 0.92));
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 14px 36px rgba(8, 67, 64, 0.26);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .tp-brand {
          border: 0;
          background: transparent;
          cursor: pointer;
          color: #ffffff;
          font-size: clamp(1rem, 1.2vw, 1.14rem);
          font-weight: 700;
          letter-spacing: 0.2px;
          padding: 8px 12px;
          margin-right: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .tp-nav-links {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.2vw, 16px);
          flex-wrap: wrap;
          justify-content: center;
          flex: 1;
        }

        .tp-hamburger {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 0;
          background: rgba(255, 255, 255, 0.2);
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }

        .tp-hamburger-box {
          width: 18px;
          height: 14px;
          position: relative;
        }

        .tp-hamburger-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #ffffff;
          border-radius: 999px;
          transition: transform 200ms ease, opacity 200ms ease, top 200ms ease, bottom 200ms ease;
        }

        .tp-hamburger-line:nth-child(1) {
          top: 0;
        }

        .tp-hamburger-line:nth-child(2) {
          top: 6px;
        }

        .tp-hamburger-line:nth-child(3) {
          bottom: 0;
        }

        .tp-hamburger.open .tp-hamburger-line:nth-child(1) {
          top: 6px;
          transform: rotate(45deg);
        }

        .tp-hamburger.open .tp-hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .tp-hamburger.open .tp-hamburger-line:nth-child(3) {
          bottom: 6px;
          transform: rotate(-45deg);
        }

        .tp-mobile-panel {
          display: none;
        }

        .tp-mobile-panel-inner {
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 18px 40px rgba(8, 67, 64, 0.26);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 8px 8px 10px;
        }

        .tp-mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tp-mobile-item-button {
          width: 100%;
          text-align: left;
          border: 0;
          background: transparent;
          padding: 10px 10px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #155459;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background-color 200ms ease;
        }

        .tp-mobile-item-button:hover {
          background: rgba(24, 160, 145, 0.08);
        }

        .tp-mobile-sub {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 260ms ease, opacity 260ms ease;
          padding-left: 4px;
        }

        .tp-mobile-sub.open {
          max-height: 200px;
          opacity: 1;
        }

        .tp-mobile-sub-entry {
          width: 100%;
          border: 0;
          background: transparent;
          text-align: left;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #155459;
          cursor: pointer;
          transition: background-color 200ms ease;
        }

        .tp-mobile-sub-entry:hover {
          background: rgba(24, 160, 145, 0.08);
        }

        .tp-nav-item {
          position: relative;
          border: 0;
          background: transparent;
          color: #f2fffd;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          padding: 9px 14px;
          border-radius: 999px;
          transition: background-color 220ms ease, transform 220ms ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .tp-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .tp-profile-btn {
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .tp-profile-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
        }

        .tp-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          min-width: 200px;
          border-radius: 16px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 18px 48px rgba(14, 87, 85, 0.22);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 260ms ease, transform 260ms ease;
          z-index: 120;
        }

        .tp-dropdown.open {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        .tp-dropdown-entry {
          width: 100%;
          border: 0;
          background: transparent;
          text-align: left;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #155459;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 200ms ease, transform 200ms ease;
        }

        .tp-dropdown-entry:hover {
          background: rgba(24, 160, 145, 0.12);
          transform: translateX(3px);
        }

        .tp-profile-dropdown {
          left: auto;
          right: 0;
          transform: translateX(0) translateY(-8px);
        }

        .tp-profile-dropdown.open {
          transform: translateX(0) translateY(0);
        }

        @media (max-width: 768px) {
          .tp-navbar {
            top: 10px;
            padding: 8px 14px;
            border-radius: 20px;
          }

          .tp-nav-links {
            gap: 4px;
            justify-content: flex-end;
            display: none;
          }

          .tp-nav-item {
            padding: 8px 10px;
            font-size: 0.85rem;
          }

          .tp-dropdown {
            min-width: 170px;
          }

          .tp-hamburger {
            display: inline-flex;
          }

          .tp-mobile-panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 260ms ease, margin-top 260ms ease;
            margin-top: 0;
          }

          .tp-mobile-panel.open {
            grid-template-rows: 1fr;
            margin-top: 10px;
          }
        }
      `}</style>
      <div className="tp-nav-root" ref={navRef}>
        <nav className="tp-navbar">
          <Link
            to="/"
            className="tp-brand"
            onClick={() => {
              setActiveDropdown(null);
              setMobileMenuOpen(false);
            }}
          >
            TripPilot
          </Link>

          <div className="tp-nav-links">
            <Link
              to="/"
              className="tp-nav-item"
              onClick={() => {
                navigate("/");
                setActiveDropdown(null);
                setMobileMenuOpen(false);
              }}
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="tp-nav-item"
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
              }}
            >
              Dashboard
            </Link>

            <div style={{ position: 'relative' }}>
              <button className="tp-nav-item" onClick={() => toggleDropdown('features')}>
                Features
              </button>
              <div className={`tp-dropdown ${activeDropdown === 'features' ? 'open' : ''}`}>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('planner')}>AI Itinerary Builder</button>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('destinations')}>Smart Destination Picks</button>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('features')}>Group Sync Planning</button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <button className="tp-nav-item" onClick={() => toggleDropdown('contact')}>
                Contact
              </button>
              <div className={`tp-dropdown ${activeDropdown === 'contact' ? 'open' : ''}`}>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('contact')}>Support</button>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('contact')}>Partnerships</button>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('contact')}>Press</button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <button className="tp-nav-item" onClick={() => toggleDropdown('careers')}>
                Careers
              </button>
              <div className={`tp-dropdown ${activeDropdown === 'careers' ? 'open' : ''}`}>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('careers')}>Open Positions</button>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('careers')}>Internships</button>
                <button className="tp-dropdown-entry" onClick={() => handleScrollTo('careers')}>Culture</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <button className="tp-profile-btn" onClick={() => toggleDropdown('profile')} aria-label="Profile menu">
                👤
              </button>
              <div className={`tp-dropdown tp-profile-dropdown ${activeDropdown === 'profile' ? 'open' : ''}`}>
                <button className="tp-dropdown-entry">Log In</button>
                <button className="tp-dropdown-entry">Sign Up</button>
                <button className="tp-dropdown-entry">My Trips</button>
                <button className="tp-dropdown-entry">Settings</button>
              </div>
            </div>

            <button
              className={`tp-hamburger ${mobileMenuOpen ? 'open' : ''}`}
              aria-label="Toggle navigation menu"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setActiveDropdown(null);
              }}
            >
              <span className="tp-hamburger-box">
                <span className="tp-hamburger-line" />
                <span className="tp-hamburger-line" />
                <span className="tp-hamburger-line" />
              </span>
            </button>
          </div>
        </nav>

        <div className={`tp-mobile-panel ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="tp-mobile-panel-inner">
            <div className="tp-mobile-menu">
              <Link
                to="/"
                className="tp-mobile-item-button"
                onClick={() => {
                  navigate("/");
                  setActiveDropdown(null);
                  setMobileMenuOpen(false);
                }}
              >
                <span>Home</span>
              </Link>

              <Link
                to="/dashboard"
                className="tp-mobile-item-button"
                onClick={() => {
                  setActiveDropdown(null);
                  setMobileMenuOpen(false);
                }}
              >
                <span>Dashboard</span>
              </Link>

              <div>
                <button
                  className="tp-mobile-item-button"
                  onClick={() => toggleDropdown('features')}
                >
                  <span>Features</span>
                </button>
                <div className={`tp-mobile-sub ${activeDropdown === 'features' ? 'open' : ''}`}>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('planner')}>
                    AI Itinerary Builder
                  </button>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('destinations')}>
                    Smart Destination Picks
                  </button>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('features')}>
                    Group Sync Planning
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="tp-mobile-item-button"
                  onClick={() => toggleDropdown('contact')}
                >
                  <span>Contact</span>
                </button>
                <div className={`tp-mobile-sub ${activeDropdown === 'contact' ? 'open' : ''}`}>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('contact')}>
                    Support
                  </button>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('contact')}>
                    Partnerships
                  </button>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('contact')}>
                    Press
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="tp-mobile-item-button"
                  onClick={() => toggleDropdown('careers')}
                >
                  <span>Careers</span>
                </button>
                <div className={`tp-mobile-sub ${activeDropdown === 'careers' ? 'open' : ''}`}>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('careers')}>
                    Open Positions
                  </button>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('careers')}>
                    Internships
                  </button>
                  <button className="tp-mobile-sub-entry" onClick={() => handleScrollTo('careers')}>
                    Culture
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="tp-mobile-item-button"
                  onClick={() => toggleDropdown('profile')}
                >
                  <span>Profile</span>
                </button>
                <div className={`tp-mobile-sub ${activeDropdown === 'profile' ? 'open' : ''}`}>
                  <button className="tp-mobile-sub-entry">
                    Log In
                  </button>
                  <button className="tp-mobile-sub-entry">
                    Sign Up
                  </button>
                  <button className="tp-mobile-sub-entry">
                    My Trips
                  </button>
                  <button className="tp-mobile-sub-entry">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;