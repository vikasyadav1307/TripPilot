# TripPilot

TripPilot is a travel-planning experience that mixes an AI-first React front end with a Node.js/Express backend. The backend ships with secure user authentication powered by MongoDB, bcrypt password hashing, and JWT-based sessions.

## Tech Stack

- Frontend: React 18 + Vite, TailwindCSS
- Backend: Node.js, Express, MongoDB, JWT, bcrypt
- Tooling: ESLint, PostCSS, Nodemon for hot reloading

## Project Structure

```
.
├── src/                # React application
└── server/             # Express API
		├── config/         # Database connection helpers
		├── controllers/    # Route handlers
		├── middleware/     # Auth utilities
		├── models/         # Mongoose schemas
		└── routes/         # Express routers
```

## Backend Setup

1. `cd server`
2. `cp .env.example .env`
3. Update the newly created `.env` file:

	 ```bash
	 PORT=5000
	 MONGODB_URI=mongodb://localhost:27017/trippilot
	 JWT_SECRET=super_secure_value
	 ```

4. Install dependencies and start the API:

	 ```bash
	 npm install
	 npm run dev
	 ```

	 The server connects to MongoDB before listening. Update `MONGODB_URI` for hosted clusters.

## REST Endpoints

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Create a new user account   |
| POST   | `/api/auth/login`    | Authenticate and get a JWT  |

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
	"name": "Alex Traveler",
	"email": "alex@example.com",
	"password": "strongPass123",
	"role": "user"
}
```

Passwords are hashed with bcrypt before persisting in MongoDB. The API returns a sanitized user object for confirmation.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
	"email": "alex@example.com",
	"password": "strongPass123"
}
```

Successful authentication responds with a signed JWT token that encodes the user id and role. Attach it as `Authorization: Bearer <token>` for protected routes.

## Frontend Setup

```bash
npm install
npm run dev
```

The Vite dev server defaults to `http://localhost:5173`. Configure frontend environment variables (e.g., API base URLs) via Vite's `.env` system if needed.

## Contributing

- Keep frontend and backend changes in separate commits.
- Add tests or manual verification notes when touching authentication code.
- Never commit real secrets—only `.env.example` should contain placeholders.
