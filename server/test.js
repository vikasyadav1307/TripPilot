/* eslint-env node */
/* eslint-disable no-undef */
// test.js - Simple keyword-based chatbot for TripPilot (no APIs)
// Run from the server folder with: node test.js

// Main response function you can later replace with an AI API call
function getBotResponse(userInput) {
  const text = (userInput || '').toLowerCase().trim();

  if (!text) {
    return "I didn't catch that. Could you type something?";
  }

  // Greetings
  const greetingKeywords = ['hi', 'hello', 'hey', 'good morning', 'good evening'];
  if (greetingKeywords.some((word) => text.includes(word))) {
    const responses = [
      "Hey there! 👋 How can I help you today?",
      "Hello! I'm your TripPilot helper bot. What are you planning?",
      "Hi! Ready to talk travel or TripPilot?",
    ];
    return pickRandom(responses);
  }

  // "How are you" type questions
  if (text.includes('how are you')) {
    return "I'm just a bot, but I'm doing great and ready to help you with TripPilot and travel questions!";
  }

  // Asking bot's name
  if (text.includes('your name') || text.includes('who are you')) {
    return "I'm TripPilot Bot, your friendly travel and TripPilot assistant.";
  }

  // Questions about TripPilot project/app
  const projectKeywords = ['trippilot', 'this project', 'this app', 'this website'];
  if (projectKeywords.some((word) => text.includes(word))) {
    return 'TripPilot is a smart travel planner that helps you discover destinations, plan trips, and manage your itineraries in one place.';
  }

  // Travel: specific places like Goa, Manali
  if (text.includes('goa')) {
    return 'Goa is great for beaches, nightlife, and relaxed vibes. Perfect for a beach holiday with friends or family.';
  }

  if (text.includes('manali')) {
    return 'Manali is perfect if you love mountains, cool weather, and adventure activities like paragliding and river rafting.';
  }

  // Generic "best places" type questions
  if (text.includes('best places') || text.includes('where should i go')) {
    return 'It depends on what you like! For beaches, try Goa or Bali. For mountains, Himachal or Uttarakhand are awesome. For culture and palaces, Jaipur and Udaipur are great.';
  }

  // Simple travel suggestions (plan / trip / suggest)
  if (
    text.includes('suggest') ||
    text.includes('recommend') ||
    text.includes('plan a trip') ||
    text.includes('trip to')
  ) {
    return "Tell me a bit more: how many days, what's your budget, and do you prefer beaches, mountains, or cities? Then I can suggest something better.";
  }

  // Asking about what the bot/app can do
  if (text.includes('what can you do') || text.includes('features')) {
    return 'With TripPilot you can explore destinations, plan day-wise itineraries, track your trips, and later even use AI to generate smart travel plans.';
  }

  // Fallback for unknown questions
  const fallbackResponses = [
    "I'm not sure I understand that yet, but I can help with greetings, TripPilot questions, or simple travel suggestions.",
    "I don't have a good answer for that right now. Try asking about TripPilot or travel plans.",
    "Hmm, I didn't get that. You can ask me about TripPilot, trips, or where to travel.",
  ];
  return pickRandom(fallbackResponses);
}

// Helper to pick a random response
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Simple CLI loop so you can chat in the terminal
if (require.main === module) {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("TripPilot Bot ready! Type something (or 'exit' to quit).");

  rl.on('line', (line) => {
    const input = line.trim();
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log('Goodbye! 👋');
      rl.close();
      return;
    }

    const reply = getBotResponse(input);
    console.log('Bot:', reply);
    process.stdout.write('You: ');
  });

  process.stdout.write('You: ');
}

// Export for future reuse (e.g., HTTP API or integrating with TripPilot frontend)
module.exports = { getBotResponse };