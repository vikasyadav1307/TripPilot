import React from "react";

const WhyTripPilot = () => {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, rgba(99,199,199,0.08) 0%, rgba(158,221,221,0.06) 100%)",
        padding: "60px 20px",
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1200px", position: "relative" }}>
        {/* decorative airplane + dotted path */}
        <svg
          viewBox="0 0 800 120"
          style={{ position: "absolute", right: "10px", top: "-20px", width: "260px", opacity: 0.9 }}
        >
          <defs>
            <path id="p" d="M10 90 C 120 10, 380 10, 790 30" />
          </defs>
          <use href="#p" fill="none" stroke="rgba(30,142,142,0.15)" strokeWidth="2" strokeDasharray="6 8" />
          <g transform="translate(760,24) rotate(12)">
            <path d="M0 0 L16 6 L4 8 L0 0" fill="#1e8e8e" />
          </g>
        </svg>

        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "18px", color: "#133f3f" }}>Why TripPilot?</h2>
        <p style={{ textAlign: "center", color: "#4d7070", marginBottom: "36px" }}>
          Modern AI tools to plan, match and book trips — effortless travel for curious people.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/** Feature Card 1 */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: "220px",
              background: "rgba(255,255,255,1)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(11,67,67,0.06)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "linear-gradient(135deg,#22b8a5,#1e8e8e)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", boxShadow: "0 6px 18px rgba(34,184,165,0.18)" }}>📅</div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#103333" }}>Sync Travel Dates</h3>
              <p style={{ marginTop: "8px", color: "#516d6d", fontSize: "0.95rem" }}>Plan trips together easily</p>
            </div>
          </div>

          {/** Feature Card 2 */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: "220px",
              background: "rgba(255,255,255,1)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(11,67,67,0.06)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "linear-gradient(135deg,#63c7c7,#22b8a5)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", boxShadow: "0 6px 18px rgba(99,199,199,0.14)" }}>🧭</div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#103333" }}>Explore Destinations</h3>
              <p style={{ marginTop: "8px", color: "#516d6d", fontSize: "0.95rem" }}>AI suggests best places</p>
            </div>
          </div>

          {/** Feature Card 3 */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: "220px",
              background: "rgba(255,255,255,1)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(11,67,67,0.06)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "linear-gradient(135deg,#ffd166,#ff8a65)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", boxShadow: "0 6px 18px rgba(255,165,120,0.14)" }}>👥</div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#103333" }}>Find Travel Buddies</h3>
              <p style={{ marginTop: "8px", color: "#516d6d", fontSize: "0.95rem" }}>Connect with travelers</p>
            </div>
          </div>

          {/** Feature Card 4 */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: "220px",
              background: "rgba(255,255,255,1)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(11,67,67,0.06)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "linear-gradient(135deg,#8ecae6,#219ebc)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 6px 18px rgba(33,158,188,0.14)" }}>🏨</div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#103333" }}>Affordable Stays</h3>
              <p style={{ marginTop: "8px", color: "#516d6d", fontSize: "0.95rem" }}>Smart budget recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTripPilot;
