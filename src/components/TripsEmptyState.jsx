import React from "react";

const TripsEmptyState = ({ onCreateTrip }) => {
  return (
    <div className="rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/60 p-8 text-center shadow-md">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
        ✈️
      </div>
      <h3 className="mt-5 text-xl font-semibold text-teal-800">No trips found</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-teal-700/90 md:text-base">
        You haven&apos;t created any trips yet. Start planning your first adventure!
      </p>
      <button
        type="button"
        onClick={onCreateTrip}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 hover:shadow-lg"
      >
        Create Your First Trip
      </button>
    </div>
  );
};

export default TripsEmptyState;
