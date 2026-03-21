import React from "react";
import StatsCard from "./StatsCard";

const TripsHeader = ({ totalTrips, invites, requests, onCreateTrip }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 p-6 text-white shadow-lg md:p-8">
      <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-emerald-200/20 blur-xl" />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold md:text-3xl">Your Travel Journey</h1>
            <p className="mt-2 text-sm text-emerald-50/95 md:text-base">
              Manage your trips, track invitations, and explore new adventures
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateTrip}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-teal-700 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Create New Trip
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <StatsCard value={totalTrips} label="Total Trips" />
          <StatsCard value={invites} label="Invites" />
          <StatsCard value={requests} label="Requests" />
        </div>
      </div>
    </section>
  );
};

export default TripsHeader;
