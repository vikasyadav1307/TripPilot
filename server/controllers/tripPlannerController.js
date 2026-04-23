/* eslint-env node */
/* eslint-disable no-undef */
const { GoogleGenerativeAI } = require('@google/generative-ai');

const normalizeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const normalizeTravelStyle = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  const supportedStyles = ['budget', 'luxury', 'adventure', 'family'];
  return supportedStyles.includes(normalized) ? normalized : null;
};

const extractJsonPayload = (rawText) => {
  if (!rawText || typeof rawText !== 'string') {
    return null;
  }

  const trimmed = rawText.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;

  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
};

const buildPrompt = ({
  destination,
  days,
  budget,
  travelStyle,
  startingLocation,
  preferredActivities,
}) => {
  const chips =
    preferredActivities && preferredActivities.length
      ? preferredActivities.join(', ')
      : 'General sightseeing and local experiences';
  const startPoint = startingLocation && startingLocation.trim() ? startingLocation.trim() : 'Not provided';

  return `You are an AI Travel Planner inside a web app called TripPilot.
The user is using the "AI Planner" section to generate a personalized trip.
Your job is to create a structured, realistic, budget-aware, and user-friendly travel plan.

User Input:
Destination: ${destination}
Days: ${days}
Budget (INR): ${budget}
Travel Style: ${travelStyle}
Starting Location: ${startPoint}
Preferred Activities: ${chips}

Generate output in the following format:

Trip Summary:
- Destination:
- Duration:
- Budget:
- Travel Style:

Day 1:
Morning:
Afternoon:
Evening:
Estimated Cost:

Day 2:
...continue until Day ${days}

Final Budget Breakdown:
- Travel:
- Stay:
- Food:
- Activities:
- Total:

Extra Tips:
- Best time to visit
- Things to avoid
- Local advice

Rules:
- Divide each day into Morning, Afternoon, and Evening.
- Include famous attractions, hidden gems, and local food suggestions.
- Suggest 1 to 2 hotels per day based on travel style (${travelStyle}).
- Keep plan realistic: avoid too many places in a day.
- Optimize travel routes each day to minimize commute time and cost.
- Provide an estimated cost for each day.
- Ensure the final total stays within INR ${budget}.
- Use simple, clear, concise English.
- Do NOT use markdown (**, ##, code blocks, etc.).
- Keep output clean and easy to display in UI.
- Assume user is traveling from India unless starting location is provided.`;
};

const buildHotelPrompt = ({ destination, budget, travelStyle }) => {
  return `You are a travel assistant AI.
Generate hotel recommendations for the given destination.

Input:
Destination: ${destination}
Budget (INR): ${budget}
Travel Style: ${travelStyle}

Instructions:
1. Suggest exactly 5 hotels.
2. Include a mix of budget, mid-range, and luxury options.
3. Make hotel names realistic and commonly known.
4. Prices should be in INR (₹ per night).
5. Ratings should be between 3.5 and 5.0.
6. Keep descriptions short (1 line).

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT include any explanation or extra text.
- Ensure JSON is properly formatted (no trailing commas, no text outside JSON).

Output Format:
{
  "hotels": [
    {
      "name": "string",
      "price": "₹XXXX - ₹XXXX per night",
      "rating": "4.2",
      "location": "Area name",
      "description": "Short description"
    }
  ]
}`;
};

const buildCompactHotelPrompt = ({ destination, budget, travelStyle }) => {
  return `You are a travel assistant AI.

Generate compact hotel recommendations for a sidebar UI.

Input:
Destination: ${destination}
Budget: ${budget}
Travel Style: ${travelStyle}

STRICT RULES:
- Return ONLY valid JSON
- No explanation, no extra text
- Exactly 3 hotels (short and compact)
- Keep names realistic
- Keep text very short (for small UI cards)

OUTPUT FORMAT:

{
  "hotels": [
    {
      "name": "Hotel Name",
      "location": "Area",
      "rating": "4.2",
      "price": "₹2000 - ₹4000"
    }
  ]
}`;
};

const buildCompletePlanPrompt = ({ destination, days, budget, travelStyle }) => {
  return `You are an advanced AI travel planner.

Generate a complete travel plan with BOTH itinerary and hotel recommendations.

User Input:
Destination: ${destination}
Number of Days: ${days}
Budget: ${budget}
Travel Style: ${travelStyle}

Instructions:

1. Create a realistic day-wise itinerary.
   - Divide each day into Morning, Afternoon, Evening
   - Include popular attractions + 1 hidden gem
   - Keep travel time practical

2. Suggest exactly 5 hotels.
   - Include budget, mid-range, and luxury options
   - Use realistic or commonly known hotel names
   - Price in INR (₹ per night)
   - Rating between 3.5 and 5.0

3. Ensure the total trip roughly fits within the budget.

4. Keep descriptions short and clean (1 line each).

IMPORTANT RULES:
- Return ONLY valid JSON
- No extra text, no explanation
- No markdown
- No trailing commas

Output Format:

{
  "trip_summary": {
    "destination": "",
    "duration": "",
    "budget": "",
    "style": ""
  },
  "itinerary": [
    {
      "day": 1,
      "morning": "",
      "afternoon": "",
      "evening": "",
      "estimated_cost": ""
    }
  ],
  "hotels": [
    {
      "name": "",
      "price": "₹XXXX - ₹XXXX per night",
      "rating": "4.2",
      "location": "",
      "description": ""
    }
  ],
  "budget_breakdown": {
    "travel": "",
    "stay": "",
    "food": "",
    "activities": "",
    "total": ""
  },
  "tips": [
    "",
    ""
  ]
}`;
};

const buildItineraryHotelsPrompt = ({ destination, days, budget, travelStyle }) => {
  return `You are an AI travel planner.

Generate a travel plan with itinerary AND hotel recommendations.

User Input:
Destination: ${destination}
Days: ${days}
Budget: ${budget}
Style: ${travelStyle}

STRICT RULES (IMPORTANT):

1. Return ONLY valid JSON.
2. No extra text.
3. Always include both "itinerary" and "hotels".
4. Hotels must not be empty.

OUTPUT FORMAT:

{
  "itinerary": [
    {
      "day": 1,
      "morning": "",
      "afternoon": "",
      "evening": ""
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "price": "₹2000 - ₹4000",
      "rating": "4.2",
      "location": "Area",
      "description": "Short description"
    }
  ]
}`;
};

const isValidItineraryHotelsPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  if (!Array.isArray(payload.itinerary) || payload.itinerary.length === 0) {
    return false;
  }

  const hasValidItinerary = payload.itinerary.every((day) => {
    if (!day || typeof day !== 'object') {
      return false;
    }

    return (
      Number.isFinite(Number(day.day))
      && typeof day.morning === 'string'
      && day.morning.trim().length > 0
      && typeof day.afternoon === 'string'
      && day.afternoon.trim().length > 0
      && typeof day.evening === 'string'
      && day.evening.trim().length > 0
    );
  });

  if (!hasValidItinerary) {
    return false;
  }

  if (!Array.isArray(payload.hotels) || payload.hotels.length === 0) {
    return false;
  }

  const hotelsAreValid = payload.hotels.every((hotel) => {
    if (!hotel || typeof hotel !== 'object') {
      return false;
    }

    const rating = Number(hotel.rating);
    return (
      typeof hotel.name === 'string'
      && hotel.name.trim().length > 0
      && typeof hotel.price === 'string'
      && hotel.price.includes('₹')
      && typeof hotel.location === 'string'
      && hotel.location.trim().length > 0
      && typeof hotel.description === 'string'
      && hotel.description.trim().length > 0
      && Number.isFinite(rating)
    );
  });

  if (!hotelsAreValid) {
    return false;
  }

  return true;
};

const isValidCompletePlanPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  if (!payload.trip_summary || typeof payload.trip_summary !== 'object') {
    return false;
  }

  if (!Array.isArray(payload.itinerary) || payload.itinerary.length === 0) {
    return false;
  }

  if (!Array.isArray(payload.hotels) || payload.hotels.length !== 5) {
    return false;
  }

  if (!payload.budget_breakdown || typeof payload.budget_breakdown !== 'object') {
    return false;
  }

  if (!Array.isArray(payload.tips) || payload.tips.length === 0) {
    return false;
  }

  return true;
};

const isValidCompactHotelsPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  if (!Array.isArray(payload.hotels) || payload.hotels.length !== 3) {
    return false;
  }

  const hotelsAreValid = payload.hotels.every((hotel) => {
    if (!hotel || typeof hotel !== 'object') {
      return false;
    }

    const rating = Number(hotel.rating);
    return (
      typeof hotel.name === 'string'
      && hotel.name.trim().length > 0
      && typeof hotel.location === 'string'
      && hotel.location.trim().length > 0
      && typeof hotel.price === 'string'
      && hotel.price.includes('₹')
      && Number.isFinite(rating)
    );
  });

  return hotelsAreValid;
};

const generateTripPlan = async (req, res) => {
  const {
    destination,
    days,
    budget,
    travelStyle,
    planType,
    startingLocation,
    preferredActivities,
    preferences,
  } = req.body || {};
  const cleanedDays = normalizeNumber(days);
  const cleanedBudget = normalizeNumber(budget);
  const cleanedTravelStyle = normalizeTravelStyle(travelStyle);
  const resolvedActivities = Array.isArray(preferredActivities)
    ? preferredActivities
    : Array.isArray(preferences)
      ? preferences
      : [];
  const normalizedPlanType = typeof planType === 'string' ? planType.trim().toLowerCase() : '';
  const isCompleteRequest = normalizedPlanType === 'complete' || normalizedPlanType === 'combined';
  const isItineraryHotelRequest = normalizedPlanType === 'itinerary-hotels' || normalizedPlanType === 'itinerary_hotels';
  const isCompactHotelsRequest = normalizedPlanType === 'compact-hotels' || normalizedPlanType === 'compact_hotels';
  const isHotelOnlyRequest = normalizedPlanType === 'hotels' || (!cleanedDays && normalizedPlanType !== 'itinerary');

  if (!destination || !cleanedBudget || !cleanedTravelStyle) {
    return res.status(400).json({
      success: false,
      message:
        'destination, budget, and travelStyle (budget|luxury|adventure|family) are required.',
    });
  }

  if ((!isHotelOnlyRequest || isCompleteRequest || isItineraryHotelRequest) && !isCompactHotelsRequest && !cleanedDays) {
    return res.status(400).json({
      success: false,
      message: 'days is required for itinerary generation and complete plans.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: 'GEMINI_API_KEY is not configured. Add it to server/.env.',
    });
  }

  try {
    const prompt = isCompactHotelsRequest
      ? buildCompactHotelPrompt({
          destination,
          budget: cleanedBudget,
          travelStyle: cleanedTravelStyle,
        })
      : isItineraryHotelRequest
      ? buildItineraryHotelsPrompt({
          destination,
          days: cleanedDays,
          budget: cleanedBudget,
          travelStyle: cleanedTravelStyle,
        })
      : isCompleteRequest
      ? buildCompletePlanPrompt({
          destination,
          days: cleanedDays,
          budget: cleanedBudget,
          travelStyle: cleanedTravelStyle,
        })
      : isHotelOnlyRequest
        ? buildHotelPrompt({
            destination,
            budget: cleanedBudget,
            travelStyle: cleanedTravelStyle,
          })
        : buildPrompt({
            destination,
            days: cleanedDays,
            budget: cleanedBudget,
            travelStyle: cleanedTravelStyle,
            startingLocation,
            preferredActivities: resolvedActivities,
          });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    });

    const result = await model.generateContent(prompt);
    const planText = result?.response?.text?.();

    if (!planText) {
      throw new Error('Gemini returned an empty response');
    }

    if (isCompactHotelsRequest) {
      const compactHotelsPayload = extractJsonPayload(planText);

      if (!isValidCompactHotelsPayload(compactHotelsPayload)) {
        throw new Error('Compact hotel response was not valid JSON with exactly 3 hotels');
      }

      return res.json({ success: true, hotels: compactHotelsPayload.hotels });
    }

    if (isItineraryHotelRequest) {
      const itineraryHotelsPayload = extractJsonPayload(planText);

      if (!isValidItineraryHotelsPayload(itineraryHotelsPayload)) {
        throw new Error('Itinerary + hotels response was not valid JSON with required fields');
      }

      return res.json({ success: true, trip: itineraryHotelsPayload });
    }

    if (isCompleteRequest) {
      const completePayload = extractJsonPayload(planText);

      if (!isValidCompletePlanPayload(completePayload)) {
        throw new Error('Complete plan response was not valid JSON in the required schema');
      }

      return res.json({ success: true, trip: completePayload });
    }

    if (isHotelOnlyRequest) {
      const hotelsPayload = extractJsonPayload(planText);
      const hotels = hotelsPayload?.hotels;

      if (!Array.isArray(hotels) || hotels.length !== 5) {
        throw new Error('Hotel response was not valid JSON with exactly 5 hotels');
      }

      return res.json({ success: true, hotels });
    }

    return res.json({ success: true, plan: planText });
  } catch (error) {
    console.error('Trip plan generation failed:', error);
    return res.status(502).json({
      success: false,
      message: 'Unable to generate trip plan right now. Please try again soon.',
      details: error.message,
    });
  }
};

module.exports = { generateTripPlan };
