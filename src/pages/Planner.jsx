/* eslint-disable react-hooks/static-components */
import React, { useState } from "react";

const interestOptions = ["Food", "Adventure", "Relax", "Culture", "Nightlife", "Nature"];

const quickSuggestions = [
  {
    label: "Goa weekend trip",
    values: {
      destination: "Goa, India",
      days: 3,
      budget: 400,
      style: "leisure",
      interests: ["Food", "Nightlife", "Relax"],
    },
  },
  {
    label: "Budget Bali trip",
    values: {
      destination: "Bali, Indonesia",
      days: 6,
      budget: 900,
      style: "adventure",
      interests: ["Adventure", "Nature", "Relax"],
    },
  },
  {
    label: "Luxury Europe tour",
    values: {
      destination: "Central Europe",
      days: 10,
      budget: 3500,
      style: "luxury",
      interests: ["Culture", "Food", "Relax"],
    },
  },
];

const Planner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    days: 5,
    budget: 1500,
    style: "leisure",
  });
  const [selectedInterests, setSelectedInterests] = useState(["Food"]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [insights, setInsights] = useState(null);
  const [budgetDetails, setBudgetDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [routePlan, setRoutePlan] = useState([]);
  const [packingList, setPackingList] = useState(null);
  const [weatherInsight, setWeatherInsight] = useState(null);
  const [groupMembers, setGroupMembers] = useState([
    { name: "You", preferences: ["Relax", "Food"] },
  ]);
  const [newMember, setNewMember] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      text: "Hey explorer! Ask me anything – budgets, ideas, hidden gems. 💬",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [timeline, setTimeline] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const applySuggestion = (suggestion) => {
    setFormData({
      destination: suggestion.values.destination,
      days: suggestion.values.days,
      budget: suggestion.values.budget,
      style: suggestion.values.style,
    });
    setSelectedInterests(suggestion.values.interests);
  };

  const randFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateMockItinerary = () => {
    const dayParts = [
      { label: "Morning", time: "08:00 - 11:00" },
      { label: "Afternoon", time: "12:30 - 16:30" },
      { label: "Evening", time: "18:00 - 22:00" },
    ];
    const ideas = {
      Morning: [
        "Sunrise beach meditation",
        "Historic old town photography walk",
        "Slow breakfast at a farm-to-table café",
      ],
      Afternoon: [
        "Guided food safari through local markets",
        "Kayak through mangrove forests",
        "Museum crawl with AR guide",
      ],
      Evening: [
        "Sunset rooftop tapas trail",
        "Night bazaar street-food crawl",
        "Live jazz cruise with skyline views",
      ],
    };

    return Array.from({ length: Number(formData.days) || 1 }).map((_, index) => ({
      day: `Day ${index + 1}`,
      plan: dayParts.map((part) => ({
        segment: part.label,
        time: part.time,
        detail: randFrom(ideas[part.label]) || "Curated local immersion",
      })),
    }));
  };

  const generateInsights = () => ({
    budget: [
      { label: "Flights", percent: 0.3 },
      { label: "Stay", percent: 0.32 },
      { label: "Food", percent: 0.18 },
      { label: "Experiences", percent: 0.2 },
    ],
    tips: [
      "Book sunrise slots for crowd-free landmarks.",
      "Save on intra-city travel with day passes.",
      "Carry a lightweight rain jacket – weather is moody!",
    ],
    bestTime: "October – February",
  });

  const toInr = (usd) => Math.round((Number(usd) || 0) * 83);

  const generateBudgetDetails = () => {
    const base = toInr(formData.budget || 0);
    const breakdown = [
      { label: "Hotels", amount: base * 0.42 },
      { label: "Food", amount: base * 0.18 },
      { label: "Transport", amount: base * 0.22 },
      { label: "Experiences", amount: base * 0.18 },
    ];
    return {
      breakdown,
      suggestion: "Save ₹2,000 by opting for boutique local stays and metro passes.",
    };
  };

  const generateRecommendations = () => [
    {
      title: "Hidden jazz speakeasy",
      location: "Old Quarter",
      detail: "Reserve a table, AI-rated 4.9 for acoustic evenings.",
    },
    {
      title: "Local cooking lab",
      location: "Riverside Atelier",
      detail: "Hands-on spice workshop + dinner with a chef collective.",
    },
    {
      title: "Secret sunrise view",
      location: "Skyline Wharf",
      detail: "Catch golden hour with zero crowds, includes drone capture.",
    },
  ];

  const generateRoutePlan = () => [
    { order: 1, place: "Historic Quarter", travel: "Start" },
    { order: 2, place: "Art District", travel: "15 min e-bike" },
    { order: 3, place: "Harbor Promenade", travel: "10 min tram" },
    { order: 4, place: "Night Bazaar", travel: "18 min cab" },
  ];

  const generatePackingList = () => {
    const days = Number(formData.days) || 1;
    return {
      clothes: [
        `${days} breathable outfits`,
        `${Math.ceil(days / 2)} evening looks`,
        "Light rain jacket",
      ],
      essentials: [
        "Power bank & adapters",
        "Reusable water bottle",
        "Compact first-aid kit",
      ],
      documents: [
        "Passport & visas",
        "Smart copies on cloud",
        "Insurance & bookings",
      ],
    };
  };

  const generateWeather = () => ({
    summary: "Humid 28°C days with breezy evenings",
    advice: "Swap afternoon hikes with indoor VR museums if showers hit.",
  });

  const generateTimeline = () =>
    Array.from({ length: Number(formData.days) || 1 }).map((_, idx) => ({
      day: `Day ${idx + 1}`,
      highlight: idx === 0 ? "Arrival & settle in" : `Signature experience ${idx}`,
      time: idx === 0 ? "09:00" : "10:00",
    }));

  const triggerGeneration = () => {
    setLoading(true);
    setItinerary([]);

    setTimeout(() => {
      setItinerary(generateMockItinerary());
      setInsights(generateInsights());
      setBudgetDetails(generateBudgetDetails());
      setRecommendations(generateRecommendations());
      setRoutePlan(generateRoutePlan());
      setPackingList(generatePackingList());
      setWeatherInsight(generateWeather());
      setTimeline(generateTimeline());
      setLoading(false);
    }, 1400);
  };

  const handleGeneratePlan = (e) => {
    if (e) {
      e.preventDefault();
    }
    triggerGeneration();
  };

  const renderBudgetBars = () => {
    if (!insights?.budget) {
      return <p className="text-sm text-white/80">Generate a plan to view cost insights.</p>;
    }

    return (
      <div className="space-y-4">
        {insights.budget.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm text-white/80">
              <span>{item.label}</span>
              <span>{Math.round(item.percent * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-300 to-emerald-300"
                style={{ width: `${item.percent * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleAddMember = () => {
    if (!newMember.trim()) return;
    setGroupMembers((prev) => [
      ...prev,
      {
        name: newMember.trim(),
        preferences: [randFrom(interestOptions), randFrom(interestOptions)],
      },
    ]);
    setNewMember("");
  };

  const handleChatSubmit = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = {
      type: "user",
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    setTimeout(() => {
      const aiMessage = {
        type: "ai",
        text: "Here's a high-level sketch: split your days into sunrise explorations, afternoon immersions, and chef-led evenings. Need details?",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  const ActionButton = ({ label, onClick, variant = "primary" }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 ${
        variant === "primary"
          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-emerald-400/40"
          : "bg-white/20 border border-white/30 text-white hover:bg-white/30"
      }`}
    >
      {label}
    </button>
  );

  const glassCard = "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-emerald-500/20 p-6";

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-blue-200 to-purple-200 py-12 text-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease forwards; }
      `}</style>
      <div className="container mx-auto max-w-7xl space-y-10 px-6">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
            AI MODE
          </span>
          <h1 className="text-4xl font-bold">AI Travel Planner ✨</h1>
          <p className="text-white/80">Plan your trip intelligently with AI</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className={`${glassCard} lg:col-span-2 space-y-6`}>
            <div className="flex flex-wrap gap-3">
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  onClick={() => applySuggestion(suggestion)}
                  className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-semibold text-white/80 transition-all hover:border-white hover:bg-white/20 hover:scale-105"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleGeneratePlan} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-white/70">Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
                  placeholder="e.g., Maldives, Paris, Tokyo"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/70">Number of days</label>
                <input
                  type="number"
                  min={1}
                  value={formData.days}
                  onChange={(e) => handleInputChange("days", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/70">Budget (USD)</label>
                <input
                  type="number"
                  min={100}
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/70">Travel style</label>
                <select
                  value={formData.style}
                  onChange={(e) => handleInputChange("style", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  <option value="leisure" className="text-slate-900">Leisure</option>
                  <option value="adventure" className="text-slate-900">Adventure</option>
                  <option value="business" className="text-slate-900">Business</option>
                  <option value="luxury" className="text-slate-900">Luxury</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-white/70">Interests</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {interestOptions.map((interest) => {
                    const active = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none ${
                          active
                            ? "bg-gradient-to-r from-teal-400 to-emerald-400 text-white shadow-lg"
                            : "bg-white/10 text-white/80 hover:bg-white/20"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-400/40 transition-all hover:scale-105"
                >
                  {loading ? "Generating..." : "Generate with AI"}
                </button>
                <ActionButton label="Regenerate Plan" onClick={() => handleGeneratePlan()} />
                <ActionButton label="Save Trip" onClick={() => alert("Trip saved!")} />
                <ActionButton label="Share Plan" onClick={() => alert("Share link copied!")} />
              </div>
            </form>
          </div>

          <div className={`${glassCard} space-y-6`}>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">📈 Planner insights</h3>
              <p className="text-sm text-white/70">Budget projection, tips & best time</p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-white">Estimated budget breakdown</p>
                {renderBudgetBars()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Travel tips</p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {insights?.tips?.map((tip, index) => (
                    <li key={index} className="flex gap-2">
                      <span>•</span>
                      <span>{tip}</span>
                    </li>
                  )) || <li className="text-white/60">Tips will appear after generating.</li>}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Best time to visit</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {insights?.bestTime || "—"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">🎯 Smart itinerary</h2>
            {loading && (
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Generating itinerary...
              </div>
            )}
          </div>

          {!loading && itinerary.length === 0 && (
            <div className={`${glassCard} text-center text-white/80`}>
              Fill in the planner details and hit "Generate with AI" to craft a personalized itinerary.
            </div>
          )}

          {loading && (
            <div className={`${glassCard} text-center text-white/80`}>
              We’re crafting your journey highlights...
            </div>
          )}

          {!loading && itinerary.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {itinerary.map((day) => (
                <article
                  key={day.day}
                  className={`${glassCard} space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{day.day}</h3>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/90">
                      {formData.destination || "Your Trip"}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    {day.plan.map((segment) => (
                      <div
                        key={segment.segment}
                        className="rounded-2xl border border-white/15 bg-white/5 p-3"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                          {segment.segment} · {segment.time}
                        </p>
                        <p className="mt-1 text-white/90">{segment.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={`${glassCard} space-y-4`}>
            <h3 className="text-xl font-semibold flex items-center gap-2">💰 Budget optimization</h3>
            <p className="text-sm text-white/70">Smart allocation in INR</p>
            <dl className="space-y-3">
              {budgetDetails?.breakdown?.length ? (
                budgetDetails.breakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <dt className="text-white/70">{item.label}</dt>
                    <dd className="font-semibold text-white">₹{Math.round(item.amount).toLocaleString("en-IN")}</dd>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/60">Generate a plan to view numbers.</p>
              )}
            </dl>
            {budgetDetails && (
              <div className="rounded-2xl bg-white/15 p-4 text-sm text-white">
                💡 {budgetDetails.suggestion}
              </div>
            )}
          </div>

          <div className={`${glassCard} space-y-4`}>
            <h3 className="text-xl font-semibold flex items-center gap-2">📍 Smart recommendations</h3>
            <p className="text-sm text-white/70">Hidden gems curated for you</p>
            <div className="space-y-4">
              {recommendations.length ? (
                recommendations.map((rec) => (
                  <div key={rec.title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{rec.location}</p>
                    <h4 className="text-lg font-semibold text-white">{rec.title}</h4>
                    <p className="text-sm text-white/80">{rec.detail}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/60">Run the planner to unlock tailored picks.</p>
              )}
            </div>
          </div>

          <div className={`${glassCard} space-y-4`}>
            <h3 className="text-xl font-semibold flex items-center gap-2">🧭 Route optimization</h3>
            <p className="text-sm text-white/70">Smart order to reduce commute</p>
            <ol className="space-y-3">
              {routePlan.length ? (
                routePlan.map((stop) => (
                  <li key={stop.order} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
                    <span className="text-sm font-bold text-white/80">{stop.order}</span>
                    <div>
                      <p className="font-semibold text-white">{stop.place}</p>
                      <p className="text-xs text-white/70">Travel: {stop.travel}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-white/60">Generate a plan to see the optimized path.</p>
              )}
            </ol>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={`${glassCard} space-y-4`}>
            <h3 className="text-xl font-semibold flex items-center gap-2">🧳 Packing assistant</h3>
            <p className="text-sm text-white/70">Auto checklist based on destination + days</p>
            {packingList ? (
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(packingList).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{category}</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/80">
                      {items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/60">Generate a plan to reveal your tailored packing list.</p>
            )}
          </div>

          <div className={`${glassCard} space-y-4`}>
            <h3 className="text-xl font-semibold flex items-center gap-2">🌦️ Weather-aware suggestions</h3>
            {weatherInsight ? (
              <>
                <p className="text-lg font-semibold text-white">{weatherInsight.summary}</p>
                <p className="text-sm text-white/80">{weatherInsight.advice}</p>
                <div className="rounded-2xl bg-white/15 p-4 text-sm text-white">
                  🌦️ AI swaps afternoon treks with immersive indoor experiences if storms hit.
                </div>
              </>
            ) : (
              <p className="text-sm text-white/60">Trigger the AI planner to pull climate context.</p>
            )}
          </div>

          <div className={`${glassCard} space-y-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">🤝 Group planner</h3>
                <p className="text-sm text-white/70">Balance preferences effortlessly</p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/80">
                Balanced plan
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add friend"
                className="flex-1 rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                onClick={handleAddMember}
                className="rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:scale-105"
              >
                Add
              </button>
            </div>
            <div className="space-y-3">
              {groupMembers.map((member) => (
                <div key={member.name} className="rounded-2xl border border-white/15 bg-white/5 p-3">
                  <p className="font-semibold text-white">{member.name}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {member.preferences.map((pref) => (
                      <span key={pref} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className={`${glassCard} lg:col-span-3 space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">🗣️ Chat-based AI assistant</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-white/70">Realtime</span>
            </div>
            <div className="flex h-72 flex-col gap-3 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={`${msg.timestamp}-${index}`}
                  className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                    msg.type === "ai"
                      ? "self-start bg-white/10 text-white"
                      : "self-end bg-gradient-to-r from-teal-400 to-emerald-400 text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="mt-1 block text-[10px] text-white/60">{msg.timestamp}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="e.g., Plan 5 days in Bali under ₹50k"
                className="flex-1 rounded-full border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105"
              >
                Send
              </button>
            </form>
          </div>
        </section>

        <section className={`${glassCard} space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">📅 Calendar & reminders</h3>
              <p className="text-sm text-white/70">Timeline overview of your trip</p>
            </div>
            <button className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10">
              Add to Calendar
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.length > 0 ? (
              timeline.map((item) => (
                <div key={item.day} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {item.day} · {item.time}
                  </p>
                  <p className="mt-1 text-white">{item.highlight}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/60">Generate a plan to unlock a smart timeline.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Planner;
