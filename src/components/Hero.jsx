import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import taj from "../assets/images/tajmahal.jpg";
import beach from "../assets/images/beach.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setParallaxOffset(window.scrollY * 0.08);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <section className="hero-wrap" id="home">
      <style>{`
        .hero-wrap {
          min-height: 100vh;
          padding: clamp(20px, 3vw, 40px);
          background: linear-gradient(140deg, #d7f6f3 0%, #c0ece9 42%, #a8dddd 100%);
          font-family: Inter, Poppins, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          animation: heroFadeIn 700ms ease both;
        }

        .hero-shell {
          width: min(1240px, 94vw);
          margin: 0 auto;
          border-radius: clamp(30px, 4vw, 44px);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.72));
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -20px 35px rgba(42, 120, 124, 0.05),
            0 24px 60px rgba(23, 92, 98, 0.17);
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          padding: clamp(16px, 2vw, 24px) clamp(20px, 3.2vw, 40px) clamp(40px, 5vw, 64px);
          position: relative;
          overflow: hidden;
        }

        .hero-shell::before {
          content: "";
          position: absolute;
          inset: auto -180px -180px auto;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(61, 200, 193, 0.28), transparent 68%);
          pointer-events: none;
        }

        .hero-nav {
          position: sticky;
          top: 18px;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 16px;
          border-radius: 999px;
          background: linear-gradient(120deg, rgba(16, 123, 122, 0.96), rgba(37, 171, 156, 0.9));
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 12px 30px rgba(8, 67, 64, 0.28);
        }

        .brand {
          border: 0;
          background: transparent;
          cursor: pointer;
          color: #ffffff;
          font-size: clamp(1.02rem, 1.2vw, 1.16rem);
          font-weight: 700;
          letter-spacing: 0.2px;
          padding-inline: 10px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.3vw, 20px);
          position: relative;
        }

        .nav-item,
        .ghost-btn {
          border: 0;
          background: transparent;
          color: #f2fffd;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          padding: 9px 12px;
          border-radius: 999px;
          transition: background-color 240ms ease, transform 240ms ease;
        }

        .nav-item:hover,
        .ghost-btn:hover {
          background-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-1px);
        }

        .profile-btn {
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .profile-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
        }

        .menu-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: 220px;
          border-radius: 18px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.63);
          box-shadow: 0 18px 44px rgba(14, 87, 85, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: opacity 280ms ease, transform 280ms ease;
        }

        .menu-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .menu-entry {
          width: 100%;
          border: 0;
          background: transparent;
          text-align: left;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #16474c;
          cursor: pointer;
          transition: background-color 220ms ease, transform 220ms ease;
        }

        .menu-entry:hover {
          background: rgba(24, 160, 145, 0.14);
          transform: translateX(2px);
        }

        .mobile-toggle {
          display: none;
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .mobile-panel {
          display: none;
        }

        .hero-content {
          margin-top: clamp(18px, 3vw, 36px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 4vw, 60px);
        }

        .hero-copy {
          flex: 1 1 320px;
        }

        .hero-visual {
          position: relative;
          min-height: clamp(320px, 42vw, 480px);
          flex: 1 1 280px;
        }

        .hero-copy h1 {
          margin: 0;
          font-size: clamp(2.05rem, 5.5vw, 4rem);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: #08363b;
          max-width: 12ch;
        }

        .hero-copy p {
          margin: clamp(14px, 2vw, 22px) 0 0;
          max-width: 52ch;
          color: #51656c;
          font-size: clamp(0.98rem, 1.25vw, 1.1rem);
          line-height: 1.72;
        }

        .hero-actions {
          margin-top: clamp(18px, 2.6vw, 30px);
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cta-btn {
          border: 0;
          border-radius: 999px;
          padding: 13px 24px;
          font-size: 0.96rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 260ms ease, box-shadow 260ms ease, background-color 260ms ease, color 260ms ease;
        }

        .cta-btn:hover {
          transform: scale(1.03);
        }

        .cta-primary {
          background: linear-gradient(120deg, #178f89, #22b8a5);
          color: #ffffff;
          box-shadow: 0 12px 30px rgba(19, 137, 124, 0.28);
        }

        .cta-primary:hover {
          box-shadow: 0 16px 36px rgba(19, 137, 124, 0.35);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(22, 122, 118, 0.38);
          color: #0e6266;
          box-shadow: 0 10px 24px rgba(19, 87, 90, 0.12);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 14px 30px rgba(19, 87, 90, 0.17);
        }

        .float-card {
          position: absolute;
          width: clamp(170px, 24vw, 280px);
          height: clamp(230px, 32vw, 380px);
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.62);
          box-shadow:
            0 22px 50px rgba(8, 64, 69, 0.24),
            0 0 0 1px rgba(158, 255, 243, 0.28),
            inset 0 0 32px rgba(173, 251, 245, 0.2);
          transition: transform 380ms ease, box-shadow 320ms ease;
          animation: floatLoop 7s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .float-card:hover {
          transform: perspective(900px) rotateX(4deg) rotateY(-6deg) translateY(-10px) scale(1.02) !important;
          box-shadow:
            0 30px 62px rgba(8, 64, 69, 0.3),
            0 0 0 1px rgba(176, 255, 247, 0.48),
            inset 0 0 42px rgba(173, 251, 245, 0.32);
        }

        .float-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          inset: auto 0 0;
          padding: 16px;
          background: linear-gradient(180deg, rgba(2, 17, 21, 0.02), rgba(2, 17, 21, 0.86));
          color: #f6ffff;
        }

        .card-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .card-sub {
          margin: 2px 0 0;
          font-size: 0.83rem;
          color: rgba(235, 255, 254, 0.88);
        }

        .ai-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #0a6862;
          background: rgba(237, 255, 253, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 999px;
          padding: 5px 10px;
          box-shadow: 0 6px 14px rgba(8, 52, 53, 0.18);
        }

        .card-back {
          top: 6%;
          right: 30%;
          transform: rotate(-7deg);
          animation-delay: 0.4s;
          z-index: 1;
        }

        .card-front {
          top: 18%;
          right: 3%;
          transform: rotate(5deg);
          z-index: 3;
        }

        .hero-pill {
          position: absolute;
          top: 52%;
          right: 33%;
          transform: translateY(-50%);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 0.84rem;
          color: #0c5f63;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 12px 24px rgba(8, 52, 53, 0.15);
          z-index: 4;
          animation: floatLoop 6.5s ease-in-out infinite;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatLoop {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--tilt, 0deg));
          }
          50% {
            transform: translateY(-12px) rotate(var(--tilt, 0deg));
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            gap: clamp(18px, 2.8vw, 28px);
          }

          .card-back {
            right: 24%;
          }
        }

        @media (max-width: 900px) {
          .hero-nav {
            border-radius: 22px;
            align-items: center;
          }

          .nav-links,
          .profile-wrap {
            display: none;
          }

          .mobile-toggle {
            display: inline-grid;
            place-items: center;
          }

          .mobile-panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 320ms ease, margin-top 320ms ease;
            margin-top: 0;
          }

          .mobile-panel.open {
            grid-template-rows: 1fr;
            margin-top: 12px;
          }

          .mobile-inner {
            overflow: hidden;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.64);
            box-shadow: 0 16px 34px rgba(12, 75, 72, 0.18);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 8px;
          }

          .mobile-entry {
            width: 100%;
            border: 0;
            background: transparent;
            text-align: left;
            padding: 12px;
            border-radius: 10px;
            color: #155459;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 220ms ease;
          }

          .mobile-entry:hover {
            background: rgba(31, 167, 152, 0.12);
          }

          .hero-content {
            flex-direction: column;
          }

          .hero-copy {
            text-align: center;
          }

          .hero-copy h1,
          .hero-copy p {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-visual {
            min-height: clamp(280px, 64vw, 360px);
          }

          .float-card {
            width: clamp(145px, 36vw, 210px);
            height: clamp(200px, 48vw, 300px);
          }

          .card-back {
            left: 12%;
            top: 10%;
            right: auto;
          }

          .card-front {
            right: 10%;
            top: 18%;
          }

          .hero-pill {
            top: auto;
            bottom: 2%;
            right: 50%;
            transform: translateX(50%);
          }
        }

        @media (max-width: 520px) {
          .hero-shell {
            border-radius: 30px;
            padding-left: 14px;
            padding-right: 14px;
          }

          .hero-nav {
            border-radius: 16px;
          }
        }
      `}</style>

      <div className="hero-shell">
        <nav className="hero-nav" ref={navRef}>
          <button className="brand" onClick={() => handleScrollTo("home")}>TripPilot</button>

          <div className="nav-links">
            <button className="nav-item" onClick={() => handleScrollTo("home")}>Home</button>
            <button className="nav-item" onClick={() => toggleDropdown("features")}>Features</button>
            <button className="nav-item" onClick={() => handleScrollTo("contact")}>Contact</button>
            <button className="nav-item" onClick={() => handleScrollTo("careers")}>Careers</button>

            <div className={`menu-dropdown ${activeDropdown === "features" ? "open" : ""}`}>
              <button className="menu-entry" onClick={() => handleScrollTo("planner")}>AI Itinerary Builder</button>
              <button className="menu-entry" onClick={() => handleScrollTo("destinations")}>Smart Destination Picks</button>
              <button className="menu-entry" onClick={() => handleScrollTo("features")}>Group Sync Planning</button>
            </div>
          </div>

          <div className="profile-wrap" style={{ position: "relative" }}>
            <button className="profile-btn" onClick={() => toggleDropdown("profile")} aria-label="Profile menu">
              👤
            </button>
            <div className={`menu-dropdown ${activeDropdown === "profile" ? "open" : ""}`}>
              <button className="menu-entry">My Trips</button>
              <button className="menu-entry">Saved Destinations</button>
              <button className="menu-entry">Account Settings</button>
            </div>
          </div>

          <button
            className="mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setActiveDropdown(null);
            }}
          >
            ☰
          </button>
        </nav>

        <div className={`mobile-panel ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-inner">
            <button className="mobile-entry" onClick={() => handleScrollTo("home")}>Home</button>
            <button className="mobile-entry" onClick={() => handleScrollTo("features")}>Features</button>
            <button className="mobile-entry" onClick={() => handleScrollTo("contact")}>Contact</button>
            <button className="mobile-entry" onClick={() => handleScrollTo("careers")}>Careers</button>
            <button className="mobile-entry">My Profile</button>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>We Sync, AI Plans, You Explore</h1>
            <p>
              Discover trips that feel effortless with AI-personalized routes, seamless buddy sync,
              and smart recommendations designed for modern explorers.
            </p>

            <div className="hero-actions">
              <button
                className="cta-btn cta-primary"
                onClick={() => {
                  navigate("/dashboard/explore-trips");
                }}
              >
                Explore Now
              </button>
              <button
                className="cta-btn cta-secondary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
              <button className="cta-btn cta-secondary" onClick={() => handleScrollTo("features")}>
                See how it works
              </button>
            </div>
          </div>

          <div className="hero-visual" id="destinations">
            <article
              className="float-card card-back"
              style={{
                transform: `translateY(${parallaxOffset * 0.5}px) rotate(-7deg)`,
                ["--tilt"]: "-7deg",
              }}
              onClick={() => {
                navigate("/dashboard/explore-trips");
              }}
            >
              <span className="ai-badge">AI Recommended</span>
              <img src={taj} alt="Taj Mahal" />
              <div className="card-overlay">
                <h4 className="card-title">Taj Mahal</h4>
                <p className="card-sub">Agra, India</p>
              </div>
            </article>

            <article
              className="float-card card-front"
              style={{
                transform: `translateY(${parallaxOffset * -0.35}px) rotate(5deg)`,
                ["--tilt"]: "5deg",
              }}
              onClick={() => {
                navigate("/dashboard/my-trips");
              }}
            >
              <span className="ai-badge">AI Recommended</span>
              <img src={beach} alt="Goa Beach" />
              <div className="card-overlay">
                <h4 className="card-title">Goa Beach</h4>
                <p className="card-sub">Goa, India</p>
              </div>
            </article>

            <div
              className="hero-pill"
              onClick={() => {
                navigate("/dashboard/my-calendar");
              }}
            >
              ✨ Smart picks updated live
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;