import React, { useState } from 'react';

const Destinations = () => {
  const [search, setSearch] = useState('');
  const destinations = [
    { name: 'Paris', image: 'https://via.placeholder.com/200' },
    { name: 'Tokyo', image: 'https://via.placeholder.com/200' },
    { name: 'New York', image: 'https://via.placeholder.com/200' },
    { name: 'Sydney', image: 'https://via.placeholder.com/200' }
  ];

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Explore Destinations</h1>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search destination"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.75rem',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredDestinations.map((destination, index) => (
          <div
            key={index}
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={destination.image}
              alt={destination.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem', backgroundColor: 'white', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>{destination.name}</h3>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#20c997',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;