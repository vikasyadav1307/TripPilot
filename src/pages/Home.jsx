import React from 'react';
import Hero from '../components/Hero';
import WhyTripPilot from '../components/WhyTripPilot';
import ExploreByState from '../components/ExploreByState';
import Footer from '../components/Footer';

const Home = () => {
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
