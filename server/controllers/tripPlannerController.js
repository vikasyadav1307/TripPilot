/* eslint-env node */
/* eslint-disable no-undef */
const { GoogleGenerativeAI } = require('@google/generative-ai');

const normalizeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const buildPrompt = ({ destination, days, budget, preferences }) => {
  const chips = preferences && preferences.length ? preferences.join(', ') : 'General travel mix';

  return `You are an AI Travel Planner inside a web app called TripPilot.
The user is using the "AI Planner" section to generate a personalized trip.
Your job is to create a structured and user-friendly travel plan.

User Input:
Destination: ${destination}
Days: ${days}
Budget (INR): ${budget}
Preferences: ${chips}

Generate output in the following format:

Trip Title:
(A short catchy title for the trip)

Overview:
(2-3 lines about the destination and vibe)

Itinerary:

Day 1:
- Place name – short description
- Place name – short description

Day 2:
- Same format...

(Continue for all days)

Budget Breakdown (in INR ₹):
- Stay:
- Food:
- Local Travel:
- Total Estimate:

Stay Suggestions:
- Hotel 1 (budget)
- Hotel 2 (mid-range)

Tips:
- 3 to 5 useful travel tips

Rules:
- Use simple English
- Keep it clean and structured
- Do NOT use markdown (**, ##, etc.)
- Make it easy to display in UI
- Optimize for user budget
- Assume user is from India`; };

const generateTripPlan = async (req, res) => {
  const { destination, days, budget, preferences } = req.body || {};
  const cleanedDays = normalizeNumber(days);
  const cleanedBudget = normalizeNumber(budget);

  if (!destination || !cleanedDays || !cleanedBudget || !Array.isArray(preferences)) {
    return res.status(400).json({
      success: false,
      message: 'destination, days, budget, and preferences[] are required.',
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
    const prompt = buildPrompt({ destination, days: cleanedDays, budget: cleanedBudget, preferences });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    });

    const result = await model.generateContent(prompt);
    const planText = result?.response?.text?.();

    if (!planText) {
      throw new Error('Gemini returned an empty response');
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
