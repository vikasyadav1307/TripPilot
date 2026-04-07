/* eslint-env node */
/* eslint-disable no-undef */
const { neon } = require('@neondatabase/serverless');

const databaseUrl = process.env.NETLIFY_DATABASE_URL;

if (!databaseUrl) {
  console.warn('NETLIFY_DATABASE_URL is not set. Database requests will fail until configured.');
}

const sql = databaseUrl ? neon(databaseUrl) : null;

const ensureTripsTable = async () => {
  if (!sql) {
    throw new Error('NETLIFY_DATABASE_URL is not defined in environment variables');
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
    throw new Error('NETLIFY_DATABASE_URL is not defined in environment variables');
  }

  try {
    await sql`SELECT NOW() AS now`;
    await ensureTripsTable();
    console.log('Neon PostgreSQL connected successfully');
  } catch (error) {
    console.error('Neon PostgreSQL connection error:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  sql,
};
