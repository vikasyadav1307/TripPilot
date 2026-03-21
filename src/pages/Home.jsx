import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import WhyTripPilot from '../components/WhyTripPilot';
import ExploreByState from '../components/ExploreByState';
import TripPlanLauncher from '../components/TripPlanLauncher';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedCurrentUser = sessionStorage.getItem('currentUser');
      return storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
    } catch {
      return null;
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('login');

  useEffect(() => {
    const syncCurrentUser = () => {
      try {
        const storedCurrentUser = sessionStorage.getItem('currentUser');
        setCurrentUser(storedCurrentUser ? JSON.parse(storedCurrentUser) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', syncCurrentUser);
    return () => window.removeEventListener('storage', syncCurrentUser);
  }, []);

  const openLoginModal = (mode = 'login') => {
    setModalMode(mode);
    setShowModal(true);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('token');
    } catch {
      // Ignore storage cleanup errors and continue updating UI.
    }

    setCurrentUser(null);
    setShowModal(false);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setShowModal(false);
  };

  return (
    <div className="home-page-wrap">
      <style>{`
        .home-page-wrap {
          background: linear-gradient(135deg, #67c6c6 0%, #9de2e2 100%);
          min-height: 100vh;
          min-height: 100dvh;
          padding-top: clamp(16px, 3vw, 40px);
          padding-bottom: clamp(16px, 3vw, 40px);
          font-family: Arial, sans-serif;
        }

        @media (max-width: 768px) {
          .home-page-wrap {
            padding-top: 10px;
            padding-bottom: 12px;
          }
        }
      `}</style>
      {showModal && (
        <LoginModal
          mode={modalMode}
          onClose={() => setShowModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      <Hero
        currentUser={currentUser}
        openLoginModal={openLoginModal}
        onLogout={handleLogout}
      />

      {/* Why TripPilot Section (after hero) */}
      <WhyTripPilot />

      {/* Explore by State (insert after How AI Crafts Your Journey) */}
      <ExploreByState />

      {/* AI-powered trip planning cards + modal */}
      <TripPlanLauncher />

      {/* Safe footer wrapper */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
