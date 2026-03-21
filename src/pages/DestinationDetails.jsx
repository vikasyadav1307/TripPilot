import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDestinationById } from "../data/destinationData";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = getDestinationById(id);

  if (!destination) {
    return (
      <main style={{ minHeight: "100dvh", background: "linear-gradient(160deg, #e6f7f6, #f6fcff)", padding: "32px 16px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto", background: "#ffffff", borderRadius: "20px", border: "1px solid #d1d5db", padding: "24px", boxShadow: "0 14px 30px rgba(15, 23, 42, 0.1)" }}>
          <h1 style={{ margin: 0, color: "#0f172a" }}>Destination not found</h1>
          <p style={{ color: "#64748b" }}>We could not find details for this destination.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ border: 0, borderRadius: "999px", padding: "10px 18px", background: "linear-gradient(135deg, #0f766e, #14b8a6)", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100dvh", background: "linear-gradient(160deg, #e6f7f6, #f6fcff)", padding: "32px 16px" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", display: "grid", gap: "18px" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ width: "fit-content", border: "1px solid #a7f3d0", borderRadius: "999px", padding: "10px 16px", background: "#ffffff", color: "#0f766e", fontWeight: 700, cursor: "pointer" }}
        >
          ← Back
        </button>

        <article style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #d1d5db", overflow: "hidden", boxShadow: "0 16px 34px rgba(15, 23, 42, 0.12)" }}>
          <img
            src={destination.image}
            alt={destination.name}
            style={{ width: "100%", height: "360px", objectFit: "cover" }}
            onError={(event) => {
              event.target.src = "https://via.placeholder.com/900x560?text=TripPilot";
            }}
          />

          <div style={{ padding: "24px", display: "grid", gap: "14px" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "2rem", color: "#0f172a" }}>{destination.name}</h1>
              <p style={{ margin: "6px 0 0", color: "#64748b", fontWeight: 600 }}>{destination.state}</p>
            </div>

            <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>{destination.description}</p>

            <section style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px" }}>
                <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1rem" }}>Best Time to Visit</h3>
                <p style={{ margin: "8px 0 0", color: "#475569" }}>{destination.bestTime}</p>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px" }}>
                <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1rem" }}>Estimated Budget</h3>
                <p style={{ margin: "8px 0 0", color: "#475569" }}>{destination.budget}</p>
              </div>
            </section>

            <section>
              <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.05rem" }}>Top Attractions</h3>
              <ul style={{ margin: "10px 0 0", paddingLeft: "18px", color: "#334155", lineHeight: 1.7 }}>
                {destination.attractions.map((attraction) => (
                  <li key={attraction}>{attraction}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
};

export default DestinationDetails;
