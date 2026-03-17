import React from 'react';

const Careers = () => {
  const jobs = [
    { title: 'Frontend Developer' },
    { title: 'AI Engineer' },
    { title: 'UI Designer' }
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Join TripPilot</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {jobs.map((job, index) => (
          <div
            key={index}
            style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>{job.title}</h3>
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
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;