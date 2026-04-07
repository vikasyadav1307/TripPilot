/* eslint-env node */
/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const tripPlannerRoutes = require('./routes/tripPlannerRoutes');
const tripsRoutes = require('./routes/tripsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api', tripPlannerRoutes);
app.use('/api/trips', tripsRoutes);

// Simple local AI Planner stub endpoint (no external API)
// Frontend expects: POST /api/ai/generate -> { result: string }
app.post('/api/ai/generate', (req, res) => {
  const userPrompt = `${req.body?.prompt || ''}`.trim();

  const safePrompt = userPrompt || 'your upcoming trip';

  const text = `Trip Title:
Custom Plan for ${safePrompt}

Overview:
This is a sample plan generated locally for ${safePrompt}. It is designed to be simple and easy to read inside TripPilot.

Itinerary:

Day 1:

Day 2:

Day 3:

Budget Breakdown (in INR ₹):

Stay Suggestions:

Tips:
`;

  res.json({ result: text });
});

// For now this project is focused on a local chatbot.
// You can later add AI API routes again when needed.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`TripPilot server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
