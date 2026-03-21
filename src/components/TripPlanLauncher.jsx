import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  {
    name: 'Goa, India',
    region: 'Coastal escape',
    description: 'Sunlit beaches, lively shacks, and Portuguese heritage walks.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Jaipur, Rajasthan',
    region: 'Culture & palaces',
    description: 'Amber Fort, pink streets, rooftop dining, and local bazaars.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Bali, Indonesia',
    region: 'Island life',
    description: 'Rice terraces, private villas, waterfalls, and beach clubs.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Tokyo, Japan',
    region: 'City + culture',
    description: 'Neon nights, sushi alleys, tranquil shrines, and cafes.',
    image: 'https://images.unsplash.com/photo-1505065585804-9fdd70af5440?auto=format&fit=crop&w=900&q=60',
  },
];

const preferenceOptions = ['Adventure', 'Relaxation', 'Food', 'Nightlife', 'Culture'];

const initialFormState = {
  destination: '',
  days: '',
  budget: '',
  preferences: [],
};

const TripPlanLauncher = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openModal = (destination) => {
    setFormData({ ...initialFormState, destination });
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    if (loading) return;
    setModalOpen(false);
    setFormData(initialFormState);
    setError('');
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (!formData.destination || !formData.days || !formData.budget || formData.preferences.length === 0) {
      setError('Please fill all fields and choose at least one preference.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: formData.destination,
          days: Number(formData.days),
          budget: Number(formData.budget),
          preferences: formData.preferences,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success || !data?.plan) {
        throw new Error(data?.message || 'Trip generation failed.');
      }

      sessionStorage.setItem('aiPlanDraft', data.plan);
      setModalOpen(false);
      setFormData(initialFormState);
      navigate('/ai-planner');
    } catch (requestError) {
      setError(requestError.message || 'Unable to generate trip right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .plan-section {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        .plan-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .plan-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #0f172a;
          margin-bottom: 10px;
        }

        .plan-subtitle {
          color: #475569;
          font-size: 1rem;
          max-width: 640px;
          margin: 0 auto;
        }

        .plan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
        }

        .plan-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(15, 118, 110, 0.08);
          display: flex;
          flex-direction: column;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .plan-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 70px rgba(15, 118, 110, 0.16);
        }

        .plan-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .plan-card-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .plan-card-destination {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
        }

        .plan-card-region {
          color: #0f766e;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .plan-card-desc {
          color: #475569;
          font-size: 0.92rem;
          flex: 1;
        }

        .plan-card button {
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #ecfeff;
          padding: 10px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .plan-card button:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 25px rgba(15, 118, 110, 0.3);
        }

        .plan-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 200ms ease forwards;
          z-index: 1000;
        }

        .plan-modal {
          background: #ffffff;
          width: min(540px, 100%);
          border-radius: 28px;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.25);
          padding: 28px;
          position: relative;
          animation: scaleIn 220ms ease forwards;
        }

        .plan-modal h3 {
          margin: 0 0 6px;
          color: #0f172a;
          font-size: 1.4rem;
        }

        .plan-modal p {
          margin: 0 0 20px;
          color: #475569;
        }

        .plan-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .plan-form label {
          display: block;
          margin-bottom: 4px;
          font-weight: 600;
          color: #0f172a;
        }

        .plan-form input {
          width: 100%;
          border-radius: 14px;
          border: 1px solid #d0d7e6;
          padding: 12px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }

        .plan-form input:focus {
          border-color: #0f766e;
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
        }

        .chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chip {
          border-radius: 999px;
          border: 1px solid #b8d8d6;
          padding: 8px 16px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 180ms ease;
          background: #f8fbfb;
          color: #0f172a;
        }

        .chip.active {
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: white;
          border-color: transparent;
          box-shadow: 0 10px 20px rgba(15, 118, 110, 0.25);
        }

        .plan-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 8px;
        }

        .plan-btn {
          border-radius: 999px;
          border: 0;
          padding: 10px 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .plan-btn.secondary {
          background: #e2e8f0;
          color: #0f172a;
        }

        .plan-btn.primary {
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: white;
          box-shadow: 0 12px 30px rgba(15, 118, 110, 0.35);
        }

        .plan-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .plan-error {
          color: #b91c1c;
          font-size: 0.9rem;
        }

        .plan-loader {
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

        @media (max-width: 640px) {
          .plan-modal {
            padding: 22px;
            border-radius: 22px;
          }
        }
      `}</style>

      <section className="plan-section">
        <header className="plan-header">
          <p className="plan-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '1px', color: '#0f766e', fontWeight: 600 }}>
            Powered by TripPilot AI
          </p>
          <h2 className="plan-title">Handpicked destinations, instant AI plans</h2>
          <p className="plan-subtitle">
            Tap "Plan Trip" on any card to customise days, budget, and vibe. TripPilot will craft a premium itinerary just for you.
          </p>
        </header>

        <div className="plan-grid">
          {destinations.map((destination) => (
            <article key={destination.name} className="plan-card">
              <img src={destination.image} alt={destination.name} loading="lazy" />
              <div className="plan-card-body">
                <span className="plan-card-region">{destination.region}</span>
                <h3 className="plan-card-destination">{destination.name}</h3>
                <p className="plan-card-desc">{destination.description}</p>
                <button type="button" onClick={() => openModal(destination.name)}>Plan Trip</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {modalOpen && (
        <div className="plan-modal-overlay" role="dialog" aria-modal="true" aria-label={`Plan trip to ${formData.destination}`}>
          <div className="plan-modal">
            <h3>Plan Your Trip to {formData.destination || '...'}</h3>
            <p>Tell TripPilot how you like to travel and we will generate a bespoke itinerary.</p>

            <form className="plan-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="destination">Destination</label>
                <input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Goa, India"
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder="Total budget"
                  required
                />
              </div>

              <div>
                <label>Preferences</label>
                <div className="chip-row">
                  {preferenceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`chip ${formData.preferences.includes(option) ? 'active' : ''}`}
                      onClick={() => togglePreference(option)}
                      aria-pressed={formData.preferences.includes(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="plan-error">{error}</p>}
              {loading && <p className="plan-loader">Generating your trip...</p>}

              <div className="plan-modal-footer">
                <button type="button" className="plan-btn secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="plan-btn primary" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TripPlanLauncher;
