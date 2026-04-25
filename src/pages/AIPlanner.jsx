import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quickFeatureCards = [
  {
    title: 'Smart Trip Planner',
    icon: '🧠',
    query: 'Plan a 4-day smart trip to Jaipur with culture, food, and one hidden gem each day.',
  },
  {
    title: 'Budget Optimizer',
    icon: '💰',
    query: 'Optimize my Goa trip budget for 3 days under INR 10000 including stay and food.',
  },
  {
    title: 'Itinerary Generator',
    icon: '🗓️',
    query: 'Generate a detailed 5-day itinerary for Kerala with day-wise morning, afternoon, and evening plans.',
  },
  {
    title: 'Weather-Based Suggestions',
    icon: '🌦️',
    query: 'Suggest weather-friendly activities for a monsoon trip to Mumbai this weekend.',
  },
  {
    title: 'Travel Buddy Finder',
    icon: '🤝',
    query: 'Create a plan for group-friendly activities for 4 friends in Rishikesh for 2 days.',
  },
  {
    title: 'AI Recommended Places',
    icon: '📍',
    query: 'Recommend lesser-known places near Udaipur for a romantic 3-day getaway.',
  },
  {
    title: 'Packing Assistant',
    icon: '🧳',
    query: 'Make a packing checklist for a 6-day Bali trip in humid weather with beach activities.',
  },
  {
    title: 'Route Planner',
    icon: '🧭',
    query: 'Create an efficient route for 1 day in Delhi covering India Gate, Humayun Tomb, and local markets.',
  },
];

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '🌍', label: 'Explore Trips', path: '/dashboard/explore-trips' },
  { icon: '✈️', label: 'My Trips', path: '/dashboard/my-trips' },
  { icon: '🔄', label: 'Calendar Sync', path: '/dashboard/calendar-sync' },
  { icon: '📅', label: 'My Calendar', path: '/dashboard/my-calendar' },
  { icon: '🤖', label: 'AI Planner', path: '/ai-planner', active: true },
];

const secondaryMenuItems = [
  { icon: '⚙️', label: 'Account Settings', path: '/account-settings' },
  { icon: '📜', label: 'Terms & Policy', path: '/terms-policy' },
  { icon: '❓', label: 'Help & Support', path: '/help-support' },
];

const legacyParse = (text) => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const itinerary = [];
  let currentDay = null;
  const budget = [];
  const places = [];

  lines.forEach((line) => {
    const dayMatch = line.match(/^\**\s*(Day\s*\d+)\s*[:-]?\s*\**/i);
    if (dayMatch) {
      currentDay = { day: dayMatch[1], items: [] };
      itinerary.push(currentDay);
      return;
    }

    const isBullet = /^[-*•]/.test(line);
    const cleanLine = line.replace(/^[-*•]\s*/, '');

    if (currentDay && isBullet) {
      currentDay.items.push(cleanLine);
      return;
    }

    if (/budget|cost|expense|stay|transport|food/i.test(cleanLine) && /[:-]/.test(cleanLine)) {
      const [label, amount] = cleanLine.split(/[:-]/, 2);
      if (label && amount) {
        budget.push({ label: label.trim(), amount: amount.trim() });
      }
      return;
    }

    if (/suggest|place|visit|spot|destination|recommend/i.test(cleanLine) && isBullet) {
      places.push(cleanLine);
    }
  });

  return {
    summary: lines[0] || text,
    itinerary,
    budget,
    stays: places,
    tips: [],
    places,
    title: '',
    overview: '',
  };
};

const parseAiTextToSections = (rawText) => {
  const text = `${rawText || ''}`.trim();
  if (!text) {
    return {
      summary: 'No response generated.',
      itinerary: [],
      budget: [],
      stays: [],
      tips: [],
      title: '',
      overview: '',
    };
  }

  const lines = text.split('\n');
  const itinerary = [];
  const budget = [];
  const stays = [];
  const tips = [];
  const overviewLines = [];
  const generalHighlights = [];
  let currentDay = null;
  let section = '';
  let title = '';

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      return;
    }

    const normalized = line.toLowerCase();
    if (normalized.startsWith('trip title')) {
      title = line.replace(/^[^:]+:/i, '').trim();
      section = '';
      return;
    }

    if (normalized.startsWith('overview')) {
      section = 'overview';
      return;
    }

    if (normalized.startsWith('itinerary')) {
      section = 'itinerary';
      currentDay = null;
      return;
    }

    if (normalized.startsWith('budget breakdown')) {
      section = 'budget';
      return;
    }

    if (normalized.startsWith('stay suggestions')) {
      section = 'stays';
      return;
    }

    if (normalized.startsWith('tips')) {
      section = 'tips';
      return;
    }

    const dayMatch = line.match(/^day\s*\d+/i);
    if (dayMatch) {
      currentDay = { day: dayMatch[0].replace(/\s+/g, ' '), items: [] };
      itinerary.push(currentDay);
      section = 'itinerary';
      return;
    }

    const cleanedLine = line.replace(/^[-*•]\s*/, '');

    if (section === 'overview') {
      overviewLines.push(cleanedLine);
      return;
    }

    if (section === 'itinerary' && currentDay) {
      currentDay.items.push(cleanedLine);
      return;
    }

    if (section === 'budget') {
      const [label, amount] = cleanedLine.split(/[:-]/, 2);
      if (label && amount) {
        budget.push({ label: label.trim(), amount: amount.trim() });
      } else {
        budget.push({ label: cleanedLine, amount: '' });
      }
      return;
    }

    if (section === 'stays') {
      stays.push(cleanedLine);
      return;
    }

    if (section === 'tips') {
      tips.push(cleanedLine);
      return;
    }

    generalHighlights.push(cleanedLine);
  });

  const cleanedItinerary = itinerary
    .filter((day) => day.items.length)
    .map((day) => ({ ...day, day: day.day || 'Day' }));

  const summaryText = overviewLines.join(' ').trim() || generalHighlights[0] || text;
  const hasStructured = Boolean(title || overviewLines.length || cleanedItinerary.length || budget.length || stays.length || tips.length);

  if (!hasStructured) {
    return legacyParse(text);
  }

  return {
    summary: summaryText,
    title: title || 'Personalised Trip Plan',
    overview: overviewLines.join(' '),
    itinerary: cleanedItinerary,
    budget,
    stays,
    tips,
    places: stays,
  };
};

const transformStructuredPlan = (plan) => {
  if (!plan) {
    return null;
  }

  const itinerary = Array.isArray(plan.itinerary)
    ? plan.itinerary.map((day) => ({
        day: `Day ${day.day || ''}`.trim(),
        items: day.activities || [],
      }))
    : [];

  const budgetEntries = plan.budget
    ? Object.entries(plan.budget).map(([label, amount]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        amount,
      }))
    : [];

  return {
    summary: plan.overview || plan.title,
    title: plan.title,
    overview: plan.overview,
    itinerary,
    budget: budgetEntries,
    stays: plan.hotels || [],
    tips: plan.tips || [],
    places: itinerary.flatMap((day) => day.items),
  };
};

const transformCompletePlan = (plan) => {
  if (!plan || typeof plan !== 'object') {
    return null;
  }

  const summary = plan.trip_summary || {};
  const itinerary = Array.isArray(plan.itinerary)
    ? plan.itinerary.map((day) => ({
        day: `Day ${day.day || ''}`.trim(),
        items: [
          day.morning ? `Morning: ${day.morning}` : '',
          day.afternoon ? `Afternoon: ${day.afternoon}` : '',
          day.evening ? `Evening: ${day.evening}` : '',
          day.estimated_cost ? `Estimated Cost: ${day.estimated_cost}` : '',
        ].filter(Boolean),
      }))
    : [];

  const budget = plan.budget_breakdown
    ? Object.entries(plan.budget_breakdown).map(([label, amount]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        amount,
      }))
    : [];

  return {
    title: summary.destination ? `${summary.destination} Complete Plan` : 'Complete Travel Plan',
    summary: `${summary.duration || ''} ${summary.style || ''} plan within ${summary.budget || ''}`.trim(),
    overview: `Destination: ${summary.destination || 'N/A'} | Duration: ${summary.duration || 'N/A'} | Budget: ${summary.budget || 'N/A'} | Style: ${summary.style || 'N/A'}`,
    itinerary,
    budget,
    stays: Array.isArray(plan.hotels) ? plan.hotels : [],
    tips: Array.isArray(plan.tips) ? plan.tips : [],
    places: itinerary.flatMap((day) => day.items),
  };
};

const AIPlanner = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);
  const chatIdRef = useRef(0);

  const getNextChatId = () => {
    chatIdRef.current += 1;
    return chatIdRef.current;
  };

  useEffect(() => {
    let hydrationTimer;

    const queueHydration = (nextResponse, summaryText) => {
      hydrationTimer = setTimeout(() => {
        setAiResponse(nextResponse);
        setChatHistory([
          {
            role: 'ai',
            text: summaryText,
            ts: getNextChatId(),
          },
        ]);
      }, 0);
    };

    try {
      const storedComplete = sessionStorage.getItem('aiPlanComplete');
      if (storedComplete) {
        const parsedComplete = transformCompletePlan(JSON.parse(storedComplete));
        if (parsedComplete) {
          queueHydration(parsedComplete, parsedComplete.summary || 'Your complete travel plan is ready.');
        }
        sessionStorage.removeItem('aiPlanComplete');
        return () => {
          if (hydrationTimer) {
            clearTimeout(hydrationTimer);
          }
        };
      }

      const storedStructured = sessionStorage.getItem('aiPlanStructured');
      if (storedStructured) {
        const parsed = transformStructuredPlan(JSON.parse(storedStructured));
        if (parsed) {
          queueHydration(parsed, parsed.summary);
        }
        sessionStorage.removeItem('aiPlanStructured');
        return () => {
          if (hydrationTimer) {
            clearTimeout(hydrationTimer);
          }
        };
      }

      const storedPlan = sessionStorage.getItem('aiPlanDraft');
      if (storedPlan) {
        const parsedPlan = parseAiTextToSections(storedPlan);
        queueHydration(parsedPlan, parsedPlan.summary);
        sessionStorage.removeItem('aiPlanDraft');
      }
    } catch (error) {
      console.error('Failed to hydrate AI plan:', error);
    }

    return () => {
      if (hydrationTimer) {
        clearTimeout(hydrationTimer);
      }
    };
  }, []);

  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('user') || sessionStorage.getItem('currentUser');
      const parsed = raw ? JSON.parse(raw) : null;
      const safeUser = parsed || {};
      return {
        name: safeUser.name || 'Traveler',
        email: safeUser.email || '',
      };
    } catch {
      return { name: 'Traveler', email: '' };
    }
  }, []);

  const closeMenus = () => setSidebarOpen(false);

  const generateTripResponse = (input) => {
    const queryText = `${input || ''}`.toLowerCase();

    if (queryText.includes('goa')) {
      return {
        title: '3-Day Goa Budget Trip',
        summary: 'A beach-forward Goa plan with local food, nightlife, and affordable experiences.',
        overview: 'A compact and lively Goa itinerary for travelers balancing fun and budget.',
        itinerary: [
          { day: 'Day 1', items: ['Beach visit at Baga', 'Local seafood lunch', 'Sunset at Chapora Fort'] },
          { day: 'Day 2', items: ['Water sports session', 'Cafe hopping in Anjuna', 'Nightlife at Tito\'s lane'] },
          { day: 'Day 3', items: ['Old Goa sightseeing', 'Street shopping', 'Relaxing beach sunset'] },
        ],
        budget: [
          { label: 'Stay', amount: 'INR 3800' },
          { label: 'Food', amount: 'INR 2100' },
          { label: 'Transport', amount: 'INR 1400' },
          { label: 'Activities', amount: 'INR 2200' },
        ],
        stays: ['Candolim budget hotels', 'Hostels in Anjuna', 'Guesthouses near Calangute'],
        tips: ['Book early for cheaper stays', 'Rent a scooter for flexible transport'],
      };
    }

    if (queryText.includes('jaipur')) {
      return {
        title: '4-Day Jaipur Cultural Trip',
        summary: 'A heritage-rich Jaipur route covering forts, palaces, markets, and evening culture.',
        overview: 'A curated cultural Jaipur getaway with architecture, crafts, and local cuisine.',
        itinerary: [
          { day: 'Day 1', items: ['Amber Fort', 'Panna Meena ka Kund', 'Light & sound show'] },
          { day: 'Day 2', items: ['City Palace', 'Jantar Mantar', 'Hawa Mahal photoshoot'] },
          { day: 'Day 3', items: ['Johari Bazaar shopping', 'Block printing workshop', 'Rajasthani dinner'] },
          { day: 'Day 4', items: ['Albert Hall Museum', 'Cultural folk performance', 'Departure'] },
        ],
        budget: [
          { label: 'Stay', amount: 'INR 5200' },
          { label: 'Food', amount: 'INR 2600' },
          { label: 'Transport', amount: 'INR 1800' },
          { label: 'Experiences', amount: 'INR 2400' },
        ],
        stays: ['MI Road boutique stays', 'Bani Park hotels'],
        tips: ['Start early for forts to avoid heat', 'Keep one evening for local cultural shows'],
      };
    }

    if (queryText.includes('budget') || queryText.includes('optimizer') || queryText.includes('cost')) {
      return {
        title: 'Budget Optimized Smart Travel Plan',
        summary: 'A value-first trip split to maximize experiences without overspending.',
        overview: 'This plan prioritizes affordable stays, local transport, and pre-booked experiences.',
        itinerary: [
          { day: 'Day 1', items: ['City intro walk', 'Transit pass activation', 'Budget-friendly dinner'] },
          { day: 'Day 2', items: ['Free attractions tour', 'Local market lunch', 'Evening riverfront'] },
          { day: 'Day 3', items: ['Half-day guided activity', 'Street food crawl', 'Souvenir stop'] },
        ],
        budget: [
          { label: 'Stay', amount: '40%' },
          { label: 'Food', amount: '20%' },
          { label: 'Transport', amount: '15%' },
          { label: 'Activities', amount: '25%' },
        ],
        stays: ['Hostels or budget hotels near transit hubs'],
        tips: ['Travel weekdays for lower rates', 'Bundle tickets where possible'],
      };
    }

    return {
      title: 'Smart Travel Plan',
      summary: 'A balanced trip template with local experiences, flexible pacing, and practical budgeting.',
      overview: 'Explore local attractions, try regional food, and keep one slow day for recovery.',
      itinerary: [
        { day: 'Day 1', items: ['Explore local attractions', 'Try local food', 'Relax and enjoy'] },
        { day: 'Day 2', items: ['Museum or heritage site', 'Market walk', 'Sunset viewpoint'] },
        { day: 'Day 3', items: ['Nature spot', 'Cultural activity', 'Leisure evening'] },
      ],
      budget: [
        { label: 'Budget', amount: 'Flexible' },
      ],
      stays: ['Central neighborhood stays with easy transport'],
      tips: ['Keep one flexible slot daily for spontaneous plans'],
    };
  };

  const handleSend = async (overrideQuery) => {
    const trimmedQuery = `${overrideQuery ?? query}`.trim();
    if (loading) {
      return;
    }

    if (!trimmedQuery) {
      setErrorMessage('Please enter a trip planning query before sending.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    const userEntry = { role: 'user', text: trimmedQuery, ts: getNextChatId() };
    setChatHistory((prev) => [...prev, userEntry]);

    try {
      setTimeout(() => {
        const response = generateTripResponse(trimmedQuery);
        setAiResponse(response);
        setChatHistory((prev) => [
          ...prev,
          {
            role: 'ai',
            text: response.summary,
            ts: getNextChatId(),
          },
        ]);
        setQuery('');
        setLoading(false);

        requestAnimationFrame(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        });
      }, 1200);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to generate plan right now.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('token');
    } catch {
      // Ignore cleanup issues and still redirect.
    }

    navigate('/');
  };

  const handleFeatureCardClick = (presetQuery) => {
    setQuery(presetQuery);
    setErrorMessage('');
    handleSend(presetQuery);
  };

  return (
    <>
      <style>{`
        .ai-root {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          background: radial-gradient(circle at 10% 10%, rgba(167, 243, 208, 0.36), transparent 40%),
            radial-gradient(circle at 88% 8%, rgba(191, 219, 254, 0.42), transparent 36%),
            linear-gradient(145deg, #e8f6f5 0%, #f0faf9 50%, #f7fcfc 100%);
          font-family: Inter, Poppins, 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .ai-sidebar {
          width: 280px;
          min-width: 280px;
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #ffffff 0%, #f8fdfd 100%);
          border-radius: 0 30px 30px 0;
          box-shadow: 4px 0 30px rgba(16, 123, 122, 0.08);
          display: flex;
          flex-direction: column;
          padding: 22px 14px;
          overflow-y: auto;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 40;
        }

        .ai-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.4);
          opacity: 0;
          pointer-events: none;
          transition: opacity 220ms ease;
          z-index: 30;
        }

        .ai-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .ai-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: 16px;
          background: rgba(16, 185, 129, 0.08);
          margin-bottom: 14px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
        }

        .ai-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          overflow-y: auto;
          padding-right: 4px;
        }

        .ai-sidebar-bottom {
          margin-top: auto;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
          background: #ffffff;
        }

        .ai-secondary-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 10px;
        }

        .ai-menu-btn {
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          cursor: pointer;
          font-size: 0.92rem;
          transition: background-color 220ms ease, transform 220ms ease;
          text-align: left;
        }

        .ai-menu-btn:hover {
          background: rgba(20, 184, 166, 0.12);
          transform: translateX(2px);
        }

        .ai-menu-btn.active {
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #ecfeff;
          box-shadow: 0 10px 28px rgba(15, 118, 110, 0.3);
        }

        .ai-logout {
          border: 0;
          border-radius: 12px;
          background: #fee2e2;
          color: #991b1b;
          padding: 11px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }

        .ai-main {
          flex: 1;
          margin-left: 280px;
          width: calc(100% - 280px);
          padding: 20px;
        }

        .ai-topbar {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 18px;
          box-shadow: 0 12px 32px rgba(16, 123, 122, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          backdrop-filter: blur(10px);
          position: sticky;
          top: 14px;
          z-index: 20;
        }

        .ai-topbar-search {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #d1fae5;
          border-radius: 999px;
          padding: 9px 12px;
        }

        .ai-topbar-search input {
          border: 0;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
          background: transparent;
        }

        .ai-hamburger {
          border: 0;
          background: rgba(15, 118, 110, 0.12);
          color: #0f766e;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
          display: none;
        }

        .ai-content {
          margin-top: 18px;
          display: grid;
          gap: 16px;
        }

        .ai-header {
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: linear-gradient(130deg, rgba(15, 118, 110, 0.9), rgba(20, 184, 166, 0.82));
          color: #ecfeff;
          box-shadow: 0 16px 36px rgba(15, 118, 110, 0.26);
        }

        .ai-header h1 {
          margin: 0;
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
        }

        .ai-header p {
          margin: 8px 0 0;
          font-size: 0.98rem;
          opacity: 0.92;
        }

        .ai-prompt-card {
          border-radius: 20px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 12px 32px rgba(14, 87, 85, 0.1);
          backdrop-filter: blur(8px);
        }

        .ai-prompt-box {
          width: 100%;
          min-height: 120px;
          resize: vertical;
          border: 1px solid #cbd5e1;
          border-radius: 16px;
          padding: 14px;
          font-size: 0.98rem;
          outline: none;
          transition: border-color 220ms ease, box-shadow 220ms ease;
          background: rgba(255, 255, 255, 0.96);
        }

        .ai-prompt-box:focus {
          border-color: #0f766e;
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.16);
        }

        .ai-prompt-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
        }

        .ai-send-btn {
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #ecfeff;
          padding: 10px 18px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease;
          box-shadow: 0 12px 26px rgba(15, 118, 110, 0.28);
        }

        .ai-send-btn:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 16px 34px rgba(15, 118, 110, 0.34);
        }

        .ai-send-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .ai-loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-top-color: #ffffff;
          border-radius: 50%;
          display: inline-block;
          animation: aiSpin 0.8s linear infinite;
          vertical-align: middle;
        }

        .ai-feature-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .ai-feature-card {
          border: 1px solid rgba(255, 255, 255, 0.62);
          background: rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          padding: 14px;
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
          text-align: left;
        }

        .ai-feature-card:hover {
          transform: translateY(-3px);
          border-color: rgba(20, 184, 166, 0.6);
          box-shadow: 0 14px 30px rgba(15, 118, 110, 0.14);
        }

        .ai-feature-icon {
          font-size: 1.25rem;
          margin-bottom: 6px;
        }

        .ai-feature-title {
          margin: 0;
          font-size: 0.92rem;
          color: #0f172a;
          font-weight: 700;
        }

        .ai-results {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 12px;
        }

        .ai-card {
          border: 1px solid rgba(255, 255, 255, 0.65);
          background: rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          padding: 14px;
          backdrop-filter: blur(8px);
        }

        .ai-card h3 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 1.02rem;
        }

        .ai-plan-title {
          margin: 0 0 6px;
          font-size: 1.2rem;
          color: #0f172a;
        }

        .ai-plan-overview {
          margin: 0 0 18px;
          color: #475569;
        }

        .ai-day {
          border-left: 3px solid #14b8a6;
          padding-left: 10px;
          margin-bottom: 10px;
        }

        .ai-day h4 {
          margin: 0 0 6px;
          color: #0f766e;
          font-size: 0.9rem;
        }

        .ai-day ul {
          margin: 0;
          padding-left: 18px;
          color: #334155;
          font-size: 0.9rem;
        }

        .ai-budget-list,
        .ai-place-list {
          margin: 0;
          padding-left: 18px;
          color: #334155;
          font-size: 0.9rem;
        }

        .ai-chat {
          border: 1px solid rgba(255, 255, 255, 0.65);
          background: rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          padding: 14px;
        }

        .ai-chat h3 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 1.02rem;
        }

        .ai-chat-scroll {
          max-height: 280px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-right: 2px;
        }

        .ai-bubble {
          max-width: 78%;
          border-radius: 14px;
          padding: 10px 12px;
          font-size: 0.9rem;
          line-height: 1.45;
        }

        .ai-bubble.user {
          margin-left: auto;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #ecfeff;
        }

        .ai-bubble.ai {
          margin-right: auto;
          background: #f8fafc;
          color: #1e293b;
          border: 1px solid #dbeafe;
        }

        @keyframes aiSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1200px) {
          .ai-feature-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 980px) {
          .ai-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-110%);
            transition: transform 240ms ease;
          }

          .ai-sidebar.open {
            transform: translateX(0);
          }

          .ai-hamburger {
            display: inline-block;
          }

          .ai-results {
            grid-template-columns: 1fr;
          }

          .ai-main {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .ai-main {
            padding: 14px;
          }

          .ai-feature-grid {
            grid-template-columns: 1fr;
          }

          .ai-header {
            padding: 18px;
          }
        }
      `}</style>

      <div className="ai-root">
        <div className={`ai-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeMenus} />

        <aside className={`ai-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="ai-profile">
            <div className="ai-avatar">{currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
            <div>
              <strong style={{ color: '#0f172a' }}>{currentUser?.name || 'Traveler'}</strong>
              <div style={{ color: '#64748b', fontSize: '0.82rem' }}>AI Co-Traveler</div>
            </div>
          </div>

          <div className="ai-menu">
            <button className="ai-menu-btn" onClick={() => { navigate('/'); closeMenus(); }}>
              <span>🏠</span>
              <span>Home</span>
            </button>
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`ai-menu-btn ${item.active ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  closeMenus();
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="ai-sidebar-bottom">
            <div className="ai-secondary-menu">
              {secondaryMenuItems.map((item) => (
                <button
                  key={item.label}
                  className="ai-menu-btn"
                  onClick={() => {
                    navigate(item.path);
                    closeMenus();
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button className="ai-logout" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        <main className="ai-main">
          <header className="ai-topbar">
            <button
              className="ai-hamburger"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div className="ai-topbar-search">
              <span>🔍</span>
              <input placeholder="Search tools, destinations, and plans..." />
            </div>
            <button className="ai-menu-btn" style={{ width: 'auto', padding: '9px 12px' }}>🔔</button>
          </header>

          <section className="ai-content">
            <div className="ai-header">
              <h1>AI Travel Planner 🤖</h1>
              <p>Plan smarter trips with AI-powered recommendations</p>
            </div>

            <div className="ai-prompt-card">
              <textarea
                className="ai-prompt-box"
                placeholder="Ask AI to plan your trip (e.g., Plan a 3-day trip to Goa under ₹10,000)"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {errorMessage ? (
                <p style={{ color: '#b91c1c', margin: '10px 4px 0', fontSize: '0.88rem' }}>{errorMessage}</p>
              ) : null}
              <div className="ai-prompt-actions">
                <button className="ai-send-btn" onClick={handleSend} disabled={loading}>
                  {loading ? (
                    <>
                      <span className="ai-loader" /> AI is thinking...
                    </>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>

            <div className="ai-feature-grid">
              {quickFeatureCards.map((feature) => (
                <button
                  key={feature.title}
                  className="ai-feature-card"
                  onClick={() => handleFeatureCardClick(feature.query)}
                >
                  <div className="ai-feature-icon">{feature.icon}</div>
                  <p className="ai-feature-title">{feature.title}</p>
                </button>
              ))}
            </div>

            <div className="ai-results">
              <div className="ai-card">
                <h3>AI Response</h3>
                {!aiResponse ? (
                  <p style={{ color: '#64748b', margin: 0 }}>
                    Your generated plan will appear here with day-wise itinerary, budget breakdown, and suggested places.
                  </p>
                ) : (
                  <>
                    {aiResponse.title && <p className="ai-plan-title">{aiResponse.title}</p>}
                    <p className="ai-plan-overview">{aiResponse.overview || aiResponse.summary}</p>

                    <h3>Day-wise Itinerary</h3>
                    {aiResponse.itinerary.map((day) => (
                      <div className="ai-day" key={day.day}>
                        <h4>{day.day}</h4>
                        <ul>
                          {day.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <h3>Budget Breakdown</h3>
                    <ul className="ai-budget-list">
                      {aiResponse.budget.map((entry) => (
                        <li key={entry.label}>{entry.label}: {entry.amount}</li>
                      ))}
                    </ul>

                    {aiResponse.stays?.length ? (
                      <>
                        <h3>Stay Suggestions</h3>
                        <ul className="ai-place-list">
                          {aiResponse.stays.map((stay, index) => {
                            if (typeof stay === 'string') {
                              return <li key={`${stay}-${index}`}>{stay}</li>;
                            }

                            return (
                              <li key={`${stay.name || 'hotel'}-${index}`}>
                                <strong>{stay.name || 'Hotel'}</strong>
                                {stay.location ? `, ${stay.location}` : ''}
                                {stay.price ? ` - ${stay.price}` : ''}
                                {stay.rating ? ` (⭐ ${stay.rating})` : ''}
                                {stay.description ? `: ${stay.description}` : ''}
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : null}

                    {aiResponse.tips?.length ? (
                      <>
                        <h3>Travel Tips</h3>
                        <ul className="ai-place-list">
                          {aiResponse.tips.map((tip) => (
                            <li key={tip}>{tip}</li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </>
                )}
              </div>

              <div className="ai-chat">
                <h3>Conversation</h3>
                <div className="ai-chat-scroll" ref={chatContainerRef}>
                  {chatHistory.length === 0 ? (
                    <div className="ai-bubble ai">
                      Start with a query and I will help design your next trip.
                    </div>
                  ) : (
                    chatHistory.map((entry) => (
                      <div key={entry.ts} className={`ai-bubble ${entry.role}`}>
                        {entry.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AIPlanner;
