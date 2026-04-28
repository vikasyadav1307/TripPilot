/* eslint-env node */
/* eslint-disable no-undef */
const { neon } = require('@neondatabase/serverless');

// Support multiple database configurations for different deployment platforms
const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!databaseUrl) {
  console.warn('Database URL is not set. Set one of: NETLIFY_DATABASE_URL, DATABASE_URL, or MONGODB_URI');
}

const sql = databaseUrl ? neon(databaseUrl) : null;

const ensureTripsTable = async () => {
  if (!sql) {
    throw new Error('Database URL is not defined in environment variables');
  }

  await sql`
    CREATE TABLE IF NOT EXISTS trips (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      destination TEXT NOT NULL,
      days INTEGER NOT NULL CHECK (days > 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
};

const connectDB = async () => {
  if (!sql) {
    throw new Error('Database URL is not defined in environment variables. Set NETLIFY_DATABASE_URL, DATABASE_URL, or MONGODB_URI');
  }

  try {
    await sql`SELECT NOW() AS now`;
    await ensureTripsTable();
    console.log('Neon PostgreSQL connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  sql,
};
