const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
];

const HotelCard = ({ hotel, index = 0 }) => {
  const imageSrc = `${hotelImages[index % hotelImages.length]}?auto=format&fit=crop&w=800&q=80`;
  const mapUrl = hotel?.mapsUrl || '#';

  return (
    <div className="w-80 rounded-2xl bg-white p-4 shadow-md">
      <img
        src={imageSrc}
        alt={hotel?.name || 'Hotel'}
        className="h-40 w-full rounded-xl object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://via.placeholder.com/400x300?text=Hotel";
        }}
      />

      <h2 className="mt-2 text-lg font-semibold">{hotel?.name || 'Hotel Name'}</h2>
      <p className="text-sm text-gray-500">{hotel?.address || 'Address not available'}</p>

      <div className="mt-2 flex justify-between">
        <span>⭐ {hotel?.rating ?? 'N/A'}</span>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View on Map
        </a>
      </div>
    </div>
  );
};

export default HotelCard;
