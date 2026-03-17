import React from 'react';

const Features = () => {
  const features = [
    { title: 'Sync Travel Dates', icon: '📅' },
    { title: 'Explore Destinations', icon: '🌍' },
    { title: 'Find Travel Buddies', icon: '🤝' },
    { title: 'Affordable Stays', icon: '🏨' }
  ];

  return (
    <section style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why TripPilot?</h2>
      <div style={{
        position: 'relative',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 100"
          style={{ width: '100%', height: '50px', fill: 'none', stroke: '#20c997', strokeWidth: '2' }}
        >
          <path d="M0 50 Q150 0 300 50 T500 50" />
        </svg>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              padding: '2rem',
              backgroundColor: '#20c997',
              borderRadius: '10px',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'white',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#20c997',
                fontSize: '1.5rem'
              }}
            >
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;