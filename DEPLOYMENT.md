# Deployment Guide for TripPilot

## Quick Start

Your app is configured for full-stack deployment. Here's how to deploy:

### 1. Environment Variables Setup

Before deploying, ensure you have these environment variables configured:

- **DATABASE_URL** - PostgreSQL connection string (Neon, Render, or any PostgreSQL provider)
- **JWT_SECRET** - Random secret key for JWT tokens
- **GEMINI_API_KEY** - Google Generative AI API key
- **PORT** - Will be auto-set by deployment platform (default: 5000)

See `server/.env.example` for all available options.

---

## Deploy to Render

### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **On Render.com**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select repository: `TripPilot--AI-based-Tour-Planner`
   - Branch: `main`

3. **Configure Build & Start**
   - **Build Command**: `npm run deploy`
   - **Start Command**: `cd server && node server.js`

4. **Add Environment Variables** (in Render dashboard)
   - Click "Environment" tab
   - Add these variables:
     ```
     DATABASE_URL=your_neon_db_url
     JWT_SECRET=your_random_secret
     GEMINI_API_KEY=your_api_key
     NODE_ENV=production
     ```

5. **Create Database** (if not already created)
   - Sign up for free PostgreSQL at https://neon.tech
   - Copy the connection string → paste as `DATABASE_URL` in Render

6. **Deploy**
   - Click "Deploy" button
   - Wait for build to complete (~5-10 minutes)

---

## Deploy to Railway.app

### Steps:

1. **On Railway.com**
   - Connect GitHub repo
   - Select your TripPilot repository

2. **Configure**
   - Click on your project
   - Go to "Settings" → "Environment"
   - Add environment variables (same as Render above)

3. **Create PostgreSQL Database**
   - Click "+" → "PostgreSQL"
   - Reference the generated `DATABASE_URL` in your app variables

4. **Deploy**
   - Railway auto-deploys from GitHub
   - Check "Deployments" tab for status

---

## Deploy Frontend Only (Vercel/Netlify)

If you want frontend-only deployment (API hosted elsewhere):

```bash
npm run build
```

Deploy the `dist/` folder to Vercel or Netlify.

Update API endpoint in `src/` files from `http://localhost:5000` to your production API URL.

---

## Local Testing Before Deployment

```bash
# Build everything
npm run deploy

# Start the server (from project root)
cd server
node server.js

# Visit http://localhost:5000
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `dist` folder not found | Run `npm run build` first |
| Database connection fails | Check DATABASE_URL is correct and accessible |
| "Cannot find module" errors | Run `npm install` in project root and `server/` |
| Port already in use | Change PORT in .env or kill process on port 5000 |
| Frontend not loading | Ensure `npm run deploy` was run to create `dist/` folder |

---

## Project Structure

```
trippilot/
├── src/                    # React frontend
├── dist/                   # Built frontend (created by npm run build)
├── server/                 # Express backend
├── Procfile                # For Heroku/Railway deployment
├── package.json            # Root scripts
└── server/
    ├── server.js           # Main server file
    ├── package.json        # Server dependencies
    └── .env.example        # Environment variables template
```

---

## Important Notes

- **Never commit `.env` files** - They're in `.gitignore` for security
- **Always set environment variables** in your deployment platform
- **Database should be PostgreSQL** with Neon for free tier
- **Frontend is built into `/dist` and served by Express** - no separate frontend deployment needed
