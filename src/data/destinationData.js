const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

const normalize = (value) => `${value || ''}`.toLowerCase().replace(/[^a-z0-9]/g, '');

const slugify = (name, state) => `${normalize(name)}-${normalize(state)}`;

const getImage = (place) => {
  const formatted = normalize(place);
  const match = Object.keys(images).find((path) => {
    const fileName = path.split('/').pop() || '';
    return normalize(fileName).includes(formatted);
  });

  if (!match) {
    return 'https://via.placeholder.com/900x560?text=TripPilot';
  }

  const mod = images[match];
  const src = mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod;
  return src || 'https://via.placeholder.com/900x560?text=TripPilot';
};

export const statesList = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const STATE_PLACE_NAMES = {
  'Andhra Pradesh': ['Tirupati', 'Visakhapatnam', 'Araku Valley'],
  'Arunachal Pradesh': ['Tawang', 'Ziro Valley', 'Bomdila'],
  Assam: ['Kaziranga', 'Guwahati', 'Majuli'],
  Bihar: ['Bodh Gaya', 'Nalanda', 'Patna'],
  Chhattisgarh: ['Chitrakote', 'Raipur', 'Bastar'],
  Goa: ['Baga Beach', 'Calangute', 'Anjuna', 'Dudhsagar Falls'],
  Gujarat: ['Statue of Unity', 'Dwarka', 'Somnath', 'Kutch'],
  Haryana: ['Kurukshetra', 'Gurgaon', 'Panchkula'],
  'Himachal Pradesh': ['Manali', 'Shimla', 'Dharamshala', 'Spiti Valley'],
  Jharkhand: ['Ranchi', 'Netarhat', 'Deoghar'],
  Karnataka: ['Bangalore', 'Mysore', 'Coorg', 'Hampi'],
  Kerala: ['Munnar', 'Alleppey', 'Kochi', 'Wayanad'],
  'Madhya Pradesh': ['Khajuraho', 'Bhopal', 'Indore', 'Kanha'],
  Maharashtra: ['Mumbai', 'Pune', 'Lonavala', 'Ajanta Caves'],
  Manipur: ['Loktak', 'Imphal', 'Ukhrul'],
  Meghalaya: ['Shillong', 'Cherrapunji', 'Dawki'],
  Mizoram: ['Aizawal', 'Reiek', 'Champhai'],
  Nagaland: ['Kohima', 'Hornbill', 'Dzukou Valley'],
  Odisha: ['Puri', 'Konark', 'Bhubaneswar'],
  Punjab: ['Amritsar', 'Golden Temple', 'Jalandhar'],
  Rajasthan: ['Jaipur', 'Udaipur', 'Jaisalmer', 'Mount Abu'],
  Sikkim: ['Gangtok', 'Tsomgo Lake', 'Pelling'],
  'Tamil Nadu': ['Chennai', 'Ooty', 'Madurai', 'Rameshwaram'],
  Telangana: ['Hyderabad', 'Warangal', 'Bhadrachalam'],
  Tripura: ['Agartala', 'Ujjayanta', 'Unakoti'],
  'Uttar Pradesh': ['Taj Mahal', 'Varanasi', 'Ayodhya', 'Lucknow'],
  Uttarakhand: ['Nainital', 'Mussoorie', 'Rishikesh', 'Kedarnath'],
  'West Bengal': ['Darjeeling', 'Kolkata', 'Sundarbans'],
};

const destinationOverrides = {
  'bangalore-karnataka': {
    description: 'A vibrant city known for tech parks, gardens, and energetic food streets.',
    bestTime: 'October to February',
    attractions: ['Lalbagh Botanical Garden', 'Cubbon Park', 'MG Road'],
    budget: 'INR 8,000 - 12,000',
  },
  'goa-goa': {
    description: 'A beach paradise blending nightlife, heritage quarters, and laid-back coastal cafes.',
    bestTime: 'November to February',
    attractions: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'],
    budget: 'INR 9,500 - 15,000',
  },
  'jaipur-rajasthan': {
    description: 'The Pink City is famous for royal architecture, bazaars, and cultural experiences.',
    bestTime: 'October to March',
    attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace'],
    budget: 'INR 10,000 - 16,000',
  },
};

const buildDestination = (name, state) => {
  const id = slugify(name, state);
  const override = destinationOverrides[id] || {};

  return {
    id,
    name,
    state,
    description:
      override.description ||
      `${name} in ${state} offers a balanced mix of local culture, food, and scenic experiences for modern travelers.`,
    bestTime: override.bestTime || 'October to March',
    attractions: override.attractions || [`${name} Landmark Circuit`, `${state} Heritage Spot`, `Local Market Walk`],
    budget: override.budget || 'INR 8,000 - 14,000',
    image: getImage(name),
  };
};

export const destinationsByState = Object.fromEntries(
  Object.entries(STATE_PLACE_NAMES).map(([stateName, places]) => [
    stateName,
    places.map((placeName) => buildDestination(placeName, stateName)),
  ])
);

export const destinationList = Object.values(destinationsByState).flat();

export const getDestinationById = (id) => destinationList.find((destination) => destination.id === id);
