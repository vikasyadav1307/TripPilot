const destinationsData = {
  Goa: {
    places: ['Baga Beach', 'Calangute Beach', 'Fort Aguada', 'Anjuna Market', 'Chapora Fort', 'Fontainhas'],
    hotels: ['Budget Stay Goa', 'Sea View Resort', 'Marina Bay Retreat'],
    avgCostPerDay: 2000,
    intro: 'Lazy beaches, live music cafes, and sunset cruises.',
  },
  Delhi: {
    places: ['India Gate', 'Red Fort', 'Qutub Minar', 'Lotus Temple', 'Chandni Chowk'],
    hotels: ['Delhi Inn', 'Capital Residency', 'Connaught Suites'],
    avgCostPerDay: 1500,
    intro: 'Monuments, markets, and Mughlai food trails.',
  },
  Agra: {
    places: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Itmad-ud-Daula'],
    hotels: ['Taj Stay', 'Mughal Palace Hotel', 'Yamuna View Homestay'],
    avgCostPerDay: 1200,
    intro: 'Heritage walks, sunrise views, and marble artistry.',
  },
  Bali: {
    places: ['Tegalalang Rice Terrace', 'Uluwatu Temple', 'Canggu Beach', 'Ubud Market', 'Mount Batur'],
    hotels: ['Jungle Villa Retreat', 'Seminyak Beachfront Loft'],
    avgCostPerDay: 2800,
    intro: 'Island sunsets, waterfalls, and café hopping.',
  },
};

const preferenceExtras = {
  Adventure: {
    activities: ['Try water sports or a guided trek.', 'Book an early morning hike for epic sunrise views.'],
    tip: 'Carry sports shoes and quick-dry gear for outdoor adventures.',
  },
  Relaxation: {
    activities: ['Schedule a spa session or sunset cruise.', 'Plan a slow morning with coffee and beachside yoga.'],
    tip: 'Keep some downtime daily to soak in the vibe without rushing.',
  },
  Food: {
    activities: ['Go on a local food crawl or cooking class.', 'Reserve dinner at a chef-led kitchen or street food lane.'],
    tip: 'Ask locals for their favourite food spots—you’ll discover hidden gems.',
  },
  Nightlife: {
    activities: ['Check out rooftop lounges or live music bars.', 'Plan a late-night café hop or stargazing walk.'],
    tip: 'Book transport in advance for late-night plans and stay hydrated.',
  },
  Culture: {
    activities: ['Join a heritage walk or museum tour.', 'Shop local crafts and attend a folk performance.'],
    tip: 'Hire local guides to unlock deeper stories behind each monument.',
  },
};

const formatCurrency = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

const classifyBudgetTier = (budget) => {
  if (budget < 5000) return 'budget';
  if (budget <= 15000) return 'mid';
  return 'premium';
};

export const generateTripPlan = ({ destination, days, budget, preferences }) => {
  const normalizedDestination = destination?.trim();
  const safePreferences = Array.isArray(preferences) ? preferences : [];
  const destinationData = destinationsData[normalizedDestination] || {
    places: ['City Walk', 'Local Museum', 'Riverfront', 'Central Market'],
    hotels: ['City Budget Stay', 'Urban Comfort Suites'],
    avgCostPerDay: 1800,
    intro: 'Local highlights, markets, and relaxed café corners.',
  };

  const safeDays = Math.max(1, Number(days) || 1);
  const safeBudget = Math.max(1000, Number(budget) || 1000);
  const tier = classifyBudgetTier(safeBudget);
  const totalSlots = destinationData.places.length;

  const itinerary = Array.from({ length: safeDays }, (_, index) => ({
    day: index + 1,
    activities: [],
  }));

  itinerary.forEach((dayPlan, index) => {
    const start = (index * 2) % totalSlots;
    const selections = [destinationData.places[start]];
    if (destinationData.places[start + 1]) {
      selections.push(destinationData.places[start + 1]);
    }
    if (destinationData.places[start + 2] && safeDays <= 4) {
      selections.push(destinationData.places[start + 2]);
    }

    selections.forEach((place) => {
      dayPlan.activities.push(`${place} – explore highlights, take photos, and enjoy local stories.`);
    });

    safePreferences.forEach((pref) => {
      const extra = preferenceExtras[pref]?.activities;
      if (extra && extra.length) {
        dayPlan.activities.push(extra[index % extra.length]);
      }
    });
  });

  const baseCost = destinationData.avgCostPerDay * safeDays;
  const stayCost = baseCost * (tier === 'premium' ? 0.6 : tier === 'mid' ? 0.5 : 0.4);
  const foodCost = baseCost * (tier === 'premium' ? 0.25 : tier === 'mid' ? 0.3 : 0.35);
  const travelCost = baseCost * (tier === 'premium' ? 0.15 : 0.2);
  const total = stayCost + foodCost + travelCost;

  const hotels = destinationData.hotels.map((hotel) => {
    if (tier === 'premium') return `${hotel} – suite / villa experience`;
    if (tier === 'mid') return `${hotel} – comfortable stay with breakfast`;
    return `${hotel} – smart budget pick close to attractions`;
  });

  const baseTips = [
    'Keep soft copies of IDs and bookings on your phone.',
    'Carry reusable bottles and stay hydrated.',
    'Book popular entries online to skip queues.',
  ];

  const preferenceTips = safePreferences
    .map((pref) => preferenceExtras[pref]?.tip)
    .filter(Boolean);

  return {
    title: `${safeDays}-Day Trip to ${normalizedDestination || 'Your Destination'}`,
    overview: `${destinationData.intro} Tailored for ${safePreferences.length ? safePreferences.join(', ') : 'balanced travel moods'}.`,
    itinerary,
    budget: {
      stay: formatCurrency(Math.round(stayCost)),
      food: formatCurrency(Math.round(foodCost)),
      travel: formatCurrency(Math.round(travelCost)),
      total: formatCurrency(Math.round(total)),
    },
    hotels,
    tips: [...baseTips, ...preferenceTips],
  };
};
export default generateTripPlan;
