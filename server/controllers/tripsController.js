/* eslint-env node */
/* eslint-disable no-undef */
const { sql } = require('../config/db');

const normalizeDays = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const saveTrip = async (req, res) => {
  try {
    if (!sql) {
      return res.status(500).json({ success: false, message: 'Database is not configured' });
    }

    const { userId, destination, days } = req.body || {};
    const normalizedDays = normalizeDays(days);

    if (!userId || !destination || !normalizedDays) {
      return res.status(400).json({
        success: false,
        message: 'userId, destination, and valid days are required',
      });
    }

    const [savedTrip] = await sql`
      INSERT INTO trips (user_id, destination, days)
      VALUES (${String(userId)}, ${String(destination)}, ${normalizedDays})
      RETURNING id, user_id, destination, days, created_at;
    `;

    return res.status(201).json({ success: true, trip: savedTrip });
  } catch (error) {
    console.error('saveTrip error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to save trip' });
  }
};

const getTripsByUser = async (req, res) => {
  try {
    if (!sql) {
      return res.status(500).json({ success: false, message: 'Database is not configured' });
    }

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }

    const trips = await sql`
      SELECT id, user_id, destination, days, created_at
      FROM trips
      WHERE user_id = ${String(userId)}
      ORDER BY created_at DESC;
    `;

    return res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error('getTripsByUser error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch trips' });
  }
};

module.exports = {
  saveTrip,
  getTripsByUser,
};
