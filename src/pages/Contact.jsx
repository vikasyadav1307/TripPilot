import React from 'react';

const Contact = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Form Section */}
      <div style={{
        flex: 1,
        maxWidth: '500px',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Name"
            style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <textarea
            placeholder="Message"
            rows="5"
            style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
          ></textarea>
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
            Send Message
          </button>
        </form>
      </div>

      {/* Illustration Section */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src="https://via.placeholder.com/400"
          alt="Travel Illustration"
          style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        />
      </div>
    </div>
  );
};

export default Contact;