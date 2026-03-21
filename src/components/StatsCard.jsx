import React from "react";

const StatsCard = ({ value, label }) => {
  return (
    <div className="rounded-xl bg-white/20 px-5 py-4 text-center shadow-md backdrop-blur-sm ring-1 ring-white/30">
      <p className="text-2xl font-bold text-white md:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-100">
        {label}
      </p>
    </div>
  );
};

export default StatsCard;
