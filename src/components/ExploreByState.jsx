import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { destinationsByState, statesList } from "../data/destinationData";

const ExploreByState = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState(statesList[0]);
  const [destinations, setDestinations] = useState(destinationsByState[statesList[0]] || []);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(false);
    const t = setTimeout(() => {
      setDestinations(destinationsByState[activeState] || []);
      const t2 = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t2);
    }, 70);

    return () => clearTimeout(t);
  }, [activeState]);

  return (
    <section style={{ background: "linear-gradient(180deg, rgba(30,142,142,0.03), rgba(34,184,165,0.02))", padding: "56px 18px" }}>
      <style>{`
        .explore-state-shell {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        .explore-state-tabs {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 8px 2px 14px;
          margin-top: 8px;
          margin-bottom: 26px;
          scrollbar-width: thin;
          scroll-behavior: smooth;
          justify-content: flex-start;
        }

        .explore-state-tabs::-webkit-scrollbar {
          height: 7px;
        }

        .explore-state-tabs::-webkit-scrollbar-thumb {
          background: rgba(20, 122, 122, 0.28);
          border-radius: 999px;
        }

        .state-pill {
          border: 1px solid rgba(16, 123, 122, 0.24);
          background: rgba(255, 255, 255, 0.78);
          color: #185f5f;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 300ms ease;
          box-shadow: 0 8px 18px rgba(11, 67, 67, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .state-pill.active {
          background: linear-gradient(120deg, #178f89, #22b8a5);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 12px 24px rgba(23, 143, 137, 0.3);
        }

        .state-pill:hover {
          transform: translateY(-2px);
        }

        .explore-cards-wrap {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .floating-card {
          position: relative;
          min-height: 300px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            0 18px 36px rgba(11, 67, 67, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.45);
          transform: translateY(18px) rotate(var(--tilt));
          opacity: 0;
          transition: transform 300ms ease, box-shadow 300ms ease, opacity 300ms ease;
        }

        .floating-card.show {
          transform: translateY(0) rotate(var(--tilt));
          opacity: 1;
        }

        .floating-card:hover {
          transform: translateY(-10px) scale(1.03) rotate(0deg) !important;
          box-shadow:
            0 28px 52px rgba(11, 67, 67, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .card-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
        }

        .card-overlay {
          position: absolute;
          inset: auto 0 0;
          padding: 16px;
          text-align: left;
          background: linear-gradient(180deg, rgba(1, 18, 22, 0.08), rgba(1, 18, 22, 0.88));
          color: #f5ffff;
        }

        .card-title {
          margin: 0;
          font-size: 1.02rem;
          font-weight: 700;
        }

        .card-subtitle {
          margin: 5px 0 12px;
          font-size: 0.84rem;
          color: rgba(229, 255, 252, 0.88);
        }

        .card-btn {
          border: 0;
          border-radius: 999px;
          padding: 8px 14px;
          background: rgba(34, 184, 165, 0.95);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(34, 184, 165, 0.32);
          transition: transform 250ms ease, box-shadow 250ms ease;
        }

        .card-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(34, 184, 165, 0.4);
        }

        @media (max-width: 1024px) {
          .explore-cards-wrap {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 820px) {
          .explore-cards-wrap {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .explore-state-shell {
            width: 94%;
          }

          .explore-cards-wrap {
            display: flex;
            overflow-x: auto;
            gap: 14px;
            padding-bottom: 8px;
            scroll-behavior: smooth;
          }

          .floating-card {
            min-width: 250px;
            min-height: 290px;
            flex: 0 0 auto;
          }
        }
      `}</style>

      <div className="explore-state-shell">
        <h2 style={{ fontSize: "1.75rem", color: "#103333", marginBottom: "12px" }}>Explore by State</h2>
        <p style={{ color: "#4d7070", marginBottom: "12px" }}>Pick a state and discover curated destinations with premium travel vibes.</p>

        <div className="explore-state-tabs" role="tablist" aria-label="States">
          {statesList.map((stateName) => (
            <button
              key={stateName}
              type="button"
              className={`state-pill ${activeState === stateName ? "active" : ""}`}
              onClick={() => setActiveState(stateName)}
            >
              {stateName}
            </button>
          ))}
        </div>

        {destinations.length > 0 ? (
          <div className="explore-cards-wrap">
            {destinations.map((place, index) => (
              <article
                key={`${activeState}-${place.name}`}
                className={`floating-card ${visible ? "show" : ""}`}
                style={{
                  "--tilt": index % 2 === 0 ? "-2deg" : "2deg",
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <img
                  className="card-bg"
                  src={place.image}
                  alt={place.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/640x420?text=TripPilot";
                  }}
                />
                <div className="card-overlay">
                  <h3 className="card-title">{place.name}</h3>
                  <p className="card-subtitle">{activeState}</p>
                  <button
                    className="card-btn"
                    type="button"
                    onClick={() => navigate(`/destination/${place.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(16, 123, 122, 0.2)",
              background: "rgba(255, 255, 255, 0.7)",
              color: "#185f5f",
              fontWeight: 700,
              padding: "34px 20px",
              boxShadow: "0 12px 28px rgba(11, 67, 67, 0.08)",
            }}
          >
            Coming soon 🚧
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreByState;
