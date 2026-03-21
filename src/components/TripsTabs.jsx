import React from "react";

const tabs = [
  { key: "created", label: "Created Trips" },
  { key: "joined", label: "Joined Trips" },
];

const TripsTabs = ({ activeTab, onChange }) => {
  return (
    <div className="inline-flex rounded-full bg-white p-1 shadow-md ring-1 ring-teal-100">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition md:px-6 ${
            activeTab === tab.key
              ? "bg-teal-600 text-white shadow"
              : "text-teal-700 hover:bg-teal-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TripsTabs;
