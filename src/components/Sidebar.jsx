import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "📊" },
  { label: "Explore Trips", to: "/dashboard/explore-trips", icon: "🌍" },
  { label: "My Trips", to: "/dashboard/my-trips", icon: "✈️" },
  { label: "Calendar Sync", to: "/dashboard/calendar-sync", icon: "🔄" },
  { label: "My Calendar", to: "/dashboard/my-calendar", icon: "📅" },
  { label: "AI Planner", to: "/ai-planner", icon: "🤖" },
];

const Sidebar = () => {
  return (
    <aside className="flex w-60 flex-col gap-2 rounded-3xl bg-white/80 p-4 shadow-xl shadow-teal-100">
      <div className="rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/80">TripPilot</p>
        <p className="text-lg font-semibold">Navigation</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-semibold transition hover:bg-teal-50 hover:text-teal-600 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-slate-600"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
