import React, { useState, useEffect } from "react";

const STATE_DATA = {
  "Uttar Pradesh": ["Taj Mahal", "Varanasi", "Ayodhya", "Lucknow"],
  Rajasthan: ["Jaipur", "Udaipur", "Jaisalmer", "Mount Abu"],
  Maharashtra: ["Mumbai", "Pune", "Lonavala", "Ajanta Caves"],
  Goa: ["Baga Beach", "Calangute", "Anjuna", "Dudhsagar Falls"],
  Kerala: ["Munnar", "Alleppey", "Kochi", "Wayanad"],
  "Himachal Pradesh": ["Manali", "Shimla", "Dharamshala", "Spiti Valley"],
  Uttarakhand: ["Nainital", "Mussoorie", "Rishikesh", "Kedarnath"],
  Punjab: ["Amritsar", "Golden Temple", "Jalandhar"],
  Haryana: ["Gurgaon", "Kurukshetra"],
  Bihar: ["Bodh Gaya", "Nalanda", "Patna"],
  Jharkhand: ["Ranchi", "Netarhat"],
  "West Bengal": ["Darjeeling", "Kolkata", "Sundarbans"],
  Odisha: ["Puri", "Konark Sun Temple", "Bhubaneswar"],
  Chhattisgarh: ["Chitrakote Falls", "Raipur"],
  "Madhya Pradesh": ["Khajuraho", "Bhopal", "Indore", "Kanha National Park"],
  Gujarat: ["Statue of Unity", "Dwarka", "Somnath", "Kutch"],
  "Andhra Pradesh": ["Tirupati", "Visakhapatnam"],
  Telangana: ["Hyderabad", "Warangal"],
  Karnataka: ["Bangalore", "Mysore", "Coorg", "Hampi"],
  "Tamil Nadu": ["Chennai", "Ooty", "Madurai", "Rameshwaram"],
  Sikkim: ["Gangtok", "Tsomgo Lake"],
  Assam: ["Kaziranga National Park", "Guwahati"],
  "Arunachal Pradesh": ["Tawang", "Ziro Valley"],
  Nagaland: ["Kohima", "Hornbill Festival"],
  Manipur: ["Loktak Lake", "Imphal"],
  Mizoram: ["Aizawl", "Reiek"],
  Tripura: ["Agartala", "Ujjayanta Palace"],
  Meghalaya: ["Shillong", "Cherrapunji", "Dawki"],
};

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png}", {
  eager: true,
});

const getImage = (place) => {
  const formatted = place.toLowerCase().replace(/\s/g, "");
  const match = Object.keys(images).find((path) =>
    path.toLowerCase().includes(formatted)
  );

  if (!match) {
    return "https://via.placeholder.com/400x300";
  }

  const mod = images[match];
  const src =
    mod && typeof mod === "object" && "default" in mod ? mod.default : mod;

  return src || "https://via.placeholder.com/400x300";
};

const ExploreByState = () => {
  const [state, setState] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!state) {
      return;
    }
    // simulate fetch/loading
    const t = setTimeout(() => {
      setVisible(false);
      setDestinations([]);
      const t2 = setTimeout(() => {
        const rawPlaces = STATE_DATA[state] || [];
        const cards = rawPlaces.map((placeName) => ({
          name: placeName,
          desc: `Popular tourist destination in ${state}.`,
        }));
        setDestinations(cards);
        // slight delay to allow CSS transition
        const t3 = setTimeout(() => setVisible(true), 40);
        return () => clearTimeout(t3);
      }, 0);
      return () => clearTimeout(t2);
    }, 0);
    return () => clearTimeout(t);
  }, [state]);

  const states = Object.keys(STATE_DATA);

  return (
    <section style={{ background: "linear-gradient(180deg, rgba(30,142,142,0.03), rgba(34,184,165,0.02))", padding: "56px 18px" }}>
      <div style={{ width: "90%", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", color: "#103333", marginBottom: "12px" }}>Explore by State</h2>
        <p style={{ color: "#4d7070", marginBottom: "22px" }}>Select a state to discover top destinations and travel highlights.</p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#2f6b6b", fontWeight: 600 }}>Select a State</span>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={{
                marginTop: "6px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(30,142,142,0.18)",
                minWidth: "240px",
                background: "white",
                color: "#0f3c3c",
                fontWeight: 600,
                outline: "none",
              }}
            >
              <option value="">-- Choose --</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {destinations.map((d, i) => (
            <div
              key={d.name}
              style={{
                flex: "1 1 30%",
                minWidth: "260px",
                maxWidth: "340px",
                background: "white",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(11,67,67,0.06)",
                transform: visible ? "translateY(0)" : "translateY(12px)",
                opacity: visible ? 1 : 0,
                transition: `opacity 420ms ease ${i * 80}ms, transform 420ms cubic-bezier(.2,.9,.2,1) ${i * 80}ms`,
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div style={{ height: "180px", background: "#eee" }}>
                <img
                  src={getImage(d.name)}
                  alt={d.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300";
                  }}
                />
              </div>
              <div style={{ padding: "16px" }}>
                <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#103333" }}>{d.name}</h3>
                <p style={{ marginTop: "8px", color: "#516d6d", fontSize: "0.95rem" }}>{d.desc}</p>
                <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button style={{ padding: "8px 14px", borderRadius: "10px", border: "none", background: "#22b8a5", color: "white", fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 18px rgba(34,184,165,0.18)" }}>
                    View Details
                  </button>
                  <span style={{ color: "#8aa6a6", fontWeight: 600 }}>{state}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreByState;
