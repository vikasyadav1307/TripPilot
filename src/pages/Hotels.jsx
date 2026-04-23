import React from "react";

const hotels = [
  {
    name: "Luxury Palace",
    location: "Jaipur",
    rating: "4.7",
    price: "₹8000",
  },
  {
    name: "Budget Stay Inn",
    location: "Goa",
    rating: "4.1",
    price: "₹2800",
  },
  {
    name: "Comfort Suites",
    location: "Delhi",
    rating: "4.3",
    price: "₹4200",
  },
  {
    name: "Royal Dunes Hotel",
    location: "Jaisalmer",
    rating: "4.6",
    price: "₹6900",
  },
  {
    name: "Urban Nest Residency",
    location: "Bengaluru",
    rating: "4.2",
    price: "₹3600",
  },
  {
    name: "Sea Breeze Retreat",
    location: "Kochi",
    rating: "4.5",
    price: "₹5400",
  },
];

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
];

const FALLBACK_HOTEL_IMAGE = "https://via.placeholder.com/400x300?text=Hotel";

const Hotels = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Hotel Recommendations</h1>
          <p className="mt-2 text-sm text-slate-500">Browse curated stays across budget, comfort, and luxury tiers.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel, index) => (
            <article
              key={hotel.name}
              className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={`${hotelImages[index % hotelImages.length]}?auto=format&fit=crop&w=800&q=80`}
                alt={hotel.name}
                className="h-44 w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_HOTEL_IMAGE;
                }}
              />

              <div className="space-y-2 p-4">
                <h2 className="text-lg font-semibold text-slate-800">{hotel.name}</h2>
                <p className="text-sm text-slate-500">{hotel.location}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-amber-500">⭐ {hotel.rating}</span>
                  <span className="font-semibold text-teal-700">{hotel.price}</span>
                </div>

                <button
                  type="button"
                  className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hotels;
