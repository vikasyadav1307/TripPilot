import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import WhyTripPilot from '../components/WhyTripPilot';
import ExploreByState from '../components/ExploreByState';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const hasSeenModal = sessionStorage.getItem('seenLoginModal') === 'true';
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!hasSeenModal && !isLoggedIn) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowModal(true);
        sessionStorage.setItem('seenLoginModal', 'true');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // If storage is unavailable for any reason, fail gracefully.
      setShowModal(false);
    }
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #67c6c6 0%, #9de2e2 100%)',
        minHeight: '100vh',
        paddingTop: '40px',
        paddingBottom: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {showModal && (
        <LoginModal onClose={() => setShowModal(false)} />
      )}

      <Hero />

      {/* Why TripPilot Section (after hero) */}
      <WhyTripPilot />

      {/* Explore by State (insert after How AI Crafts Your Journey) */}
      <ExploreByState />

      {/* Safe footer wrapper */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
