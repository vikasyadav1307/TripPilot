import React, { useState } from 'react';

const Planner = () => {
  const [itinerary, setItinerary] = useState([]);

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    // Mock itinerary data
    setItinerary([
      { day: 'Day 1', activities: ['Visit the Eiffel Tower', 'Lunch at a local cafe', 'Evening cruise on the Seine'] },
      { day: 'Day 2', activities: ['Explore the Louvre Museum', 'Shopping at Champs-Élysées', 'Dinner at a rooftop restaurant'] }
    ]);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>AI Trip Planner</h1>
      <form
        onSubmit={handleGeneratePlan}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '400px',
          margin: '0 auto',
          marginBottom: '2rem'
        }}
      >
        <input
          type="text"
          placeholder="Destination"
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Budget"
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select Travel Type</option>
          <option value="leisure">Leisure</option>
          <option value="adventure">Adventure</option>
          <option value="business">Business</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#20c997',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Generate Plan
        </button>
      </form>

      {itinerary.length > 0 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Itinerary</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {itinerary.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 style={{ marginBottom: '1rem' }}>{item.day}</h3>
                <ul>
                  {item.activities.map((activity, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;