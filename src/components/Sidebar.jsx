import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", icon: "🏠", end: true },
  { label: "Dashboard", to: "/dashboard", icon: "📊" },
  { label: "Explore Trips", to: "/dashboard/explore-trips", icon: "🌍" },
  { label: "My Trips", to: "/dashboard/my-trips", icon: "✈️" },
  { label: "Calendar Sync", to: "/dashboard/calendar-sync", icon: "🔄" },
  { label: "My Calendar", to: "/dashboard/my-calendar", icon: "📅" },
  { label: "AI Planner", to: "/ai-planner", icon: "🤖" },
  { label: "Hotels", to: "/hotels", icon: "🏨" },
];

const secondaryItems = [
  { label: "Account Settings", to: "/account-settings", icon: "⚙️" },
  { label: "Terms & Policy", to: "/terms-policy", icon: "📜" },
  { label: "Help & Support", to: "/help-support", icon: "❓" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const userName = user?.name?.trim() || "Guest";
  const avatarLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("token");
      window.dispatchEvent(new Event("user-auth-changed"));
    } catch {
      // Ignore storage errors and still redirect to home.
    }

    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] min-w-[280px] flex-col justify-between bg-white p-4 shadow-xl shadow-teal-100">
      <div className="space-y-3">
        <div className="rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">TripPilot</p>
          <p className="text-lg font-semibold">Navigation</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
            {avatarLetter}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">{userName}</p>
            <p className="text-xs text-slate-500">Traveller</p>
          </div>
        </div>
      </div>

      <nav className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1 pb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] font-semibold transition hover:bg-teal-50 hover:text-teal-600 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-slate-600"
              }`
            }
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sticky bottom-0 border-t border-slate-200 bg-white pt-3">
        <nav className="flex flex-col gap-3 pb-3">
          {secondaryItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] font-semibold transition hover:bg-teal-50 hover:text-teal-600 ${
                  isActive ? "bg-teal-50 text-teal-600" : "text-slate-600"
                }`
              }
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-rose-50 px-4 py-3 text-[15px] font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
