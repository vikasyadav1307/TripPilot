/* eslint-disable no-undef */
import React, { useState } from "react";

const interestTags = ["Food", "Adventure", "Relax", "Culture", "Nightlife", "Nature"];

const defaultRecommendations = [
  { title: "Hidden Jazz Loft", detail: "Cozy evening set with chef-led tapas." },
  { title: "Sunrise Vista Point", detail: "Panoramic lookout for golden-hour shots." },
  { title: "Street Food Safari", detail: "Guided night market crawl with locals." },
];

const baseRoute = [
  { stop: 1, place: "Historic Quarter", travel: "Start" },
  { stop: 2, place: "Art District", travel: "12 min ride" },
  { stop: 3, place: "Harbor Promenade", travel: "10 min tram" },
  { stop: 4, place: "Night Bazaar", travel: "15 min cab" },
];

const basePacking = {
  Essentials: ["Passport & IDs", "Travel insurance", "Phone + charger"],
  Apparel: ["Breathable outfits", "Layered jacket", "Comfortable shoes"],
  Extras: ["Reusable bottle", "Power bank", "Mini first-aid kit"],
};

const AIPlannerNew = () => {
  const [form, setForm] = useState({
    destination: "",
    days: 4,
    budget: 1200,
    interest: "Food",
  });
  const [itinerary, setItinerary] = useState([]);
  const [budget, setBudget] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Welcome! Describe your trip and I'll help." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleInput = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildItinerary = () => {
    const parts = [
      { label: "Morning", idea: "Cafe crawl + neighborhood stroll" },
      { label: "Afternoon", idea: "Guided experience or museum hop" },
      { label: "Evening", idea: "Sunset view + chef tasting" },
    ];
    return Array.from({ length: Number(form.days) || 1 }).map((_, idx) => ({
      day: `Day ${idx + 1}`,
      segments: parts.map((part) => ({ ...part })),
    }));
  };

  const buildBudget = () => {
    const total = Number(form.budget) || 0;
    return {
      hotel: Math.round(total * 0.45),
      food: Math.round(total * 0.25),
      transport: Math.round(total * 0.15),
      extras: Math.round(total * 0.15),
    };
  };

  const buildTimeline = () =>
    Array.from({ length: Number(form.days) || 1 }).map((_, idx) => ({
      label: `Day ${idx + 1}`,
      highlight: idx === 0 ? "Arrival & settle in" : "Signature local plan",
    }));

  const handleGenerate = (e) => {
    e.preventDefault();
    setItinerary(buildItinerary());
    setBudget(buildBudget());
    setTimeline(buildTimeline());
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", text: chatInput.trim() }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Try splitting days into culture before lunch, adventures by afternoon, and tasting menus at night.",
        },
      ]);
    }, 500);
  };

  const cardClass = "bg-white rounded-2xl shadow-lg p-5 space-y-4";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-6 py-6 space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold text-teal-600">AI tools for modern travelers</p>
          <h1 className="text-3xl font-bold text-slate-900">AI Planner Workspace</h1>
          <p className="text-slate-600">Plan smarter trips with quick generation, budgeting, and team collaboration.</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className={`${cardClass} lg:col-span-2`}>
            <h2 className="text-xl font-semibold text-slate-900">🎯 Smart Itinerary Generator</h2>
            <form onSubmit={handleGenerate} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600">Destination</label>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => handleInput("destination", e.target.value)}
                  placeholder="e.g., Bali"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-800 focus:border-teal-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Days</label>
                <input
                  type="number"
                  min={1}
                  value={form.days}
                  onChange={(e) => handleInput("days", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-800 focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Budget (USD)</label>
                <input
                  type="number"
                  min={200}
                  value={form.budget}
                  onChange={(e) => handleInput("budget", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-800 focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Interests</label>
                <select
                  value={form.interest}
                  onChange={(e) => handleInput("interest", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-800 focus:border-teal-500 focus:outline-none"
                >
                  {interestTags.map((tag) => (
                    <option key={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-500"
                >
                  Generate Plan
                </button>
              </div>
            </form>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">💰 Budget overview</h3>
            {budget ? (
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex justify-between"><span>Hotel</span><span>${budget.hotel}</span></li>
                <li className="flex justify-between"><span>Food</span><span>${budget.food}</span></li>
                <li className="flex justify-between"><span>Transport</span><span>${budget.transport}</span></li>
                <li className="flex justify-between"><span>Experiences</span><span>${budget.extras}</span></li>
              </ul>
            ) : (
              <p className="text-sm text-slate-600">Generate a plan to see allocation.</p>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={`${cardClass} md:col-span-2`}>
            <h3 className="text-lg font-semibold text-slate-900">Day-wise itinerary</h3>
            {itinerary.length === 0 ? (
              <p className="text-sm text-slate-600">No itinerary yet. Generate one to view the schedule.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {itinerary.map((day) => (
                  <div key={day.day} className="rounded-xl border border-slate-100 p-4">
                    <h4 className="text-base font-semibold text-slate-800">{day.day}</h4>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      {day.segments.map((segment) => (
                        <div key={segment.label}>
                          <p className="font-medium text-slate-700">{segment.label}</p>
                          <p>{segment.idea}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">📍 Recommendations</h3>
            <div className="space-y-3 text-sm text-slate-600">
              {defaultRecommendations.map((rec) => (
                <div key={rec.title} className="rounded-xl border border-slate-100 p-3">
                  <p className="font-semibold text-slate-800">{rec.title}</p>
                  <p>{rec.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">🧭 Route plan</h3>
            <ol className="space-y-2 text-sm text-slate-600">
              {baseRoute.map((stop) => (
                <li key={stop.stop} className="flex items-start gap-3">
                  <span className="text-sm font-bold text-teal-600">{stop.stop}.</span>
                  <div>
                    <p className="font-semibold text-slate-800">{stop.place}</p>
                    <p>{stop.travel}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">🧳 Packing list</h3>
            <div className="space-y-3 text-sm text-slate-600">
              {Object.entries(basePacking).map(([category, items]) => (
                <div key={category}>
                  <p className="font-semibold text-slate-800">{category}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">🌦️ Weather</h3>
            <p className="text-4xl font-bold text-teal-600">28°C</p>
            <p className="text-sm text-slate-600">Humid daytime, breezy evenings. Pack breathable layers and schedule hikes early.</p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">🤝 Group planner</h3>
            <div className="flex gap-2">
              <input
                type="text"
                 
                value={newMember}
                 
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add friend"
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-slate-800 focus:border-teal-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                   
                  if (!newMember.trim()) return;
                   
                  setGroupMembers((prev) => [...prev, { name: newMember.trim(), preferences: [form.interest] }]);
                   
                  setNewMember("");
                }}
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Add
              </button>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              // eslint-disable-next-line no-undef, no-undef, no-undef, no-undef
              {groupMembers.map((member) => (
                <div key={member.name} className="rounded-xl border border-slate-100 p-3">
                  <p className="font-semibold text-slate-800">{member.name}</p>
                  <p className="text-xs text-slate-500">Prefs: {member.preferences.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">🗣️ Chat assistant</h3>
            <div className="h-48 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              {chatMessages.map((msg, idx) => (
                <div key={`${msg.role}-${idx}`} className={`mb-2 ${msg.role === "ai" ? "text-teal-700" : "text-slate-800"}`}>
                  <p className="font-semibold">{msg.role === "ai" ? "AI" : "You"}</p>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for tips"
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-slate-800 focus:border-teal-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Send
              </button>
            </form>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">📅 Calendar</h3>
            <div className="space-y-3 text-sm text-slate-600">
              {timeline.length === 0 ? (
                <p>Generate a plan to see the schedule.</p>
              ) : (
                timeline.map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-100 p-3">
                    <p className="font-semibold text-slate-800">{item.label}</p>
                    <p>{item.highlight}</p>
                  </div>
                ))
              )}
            </div>
            <button className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-500">
              Add to calendar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIPlannerNew;
