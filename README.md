# GlobeStay Bookings

A hotel booking application built with React + Vite on the frontend and Express + MongoDB on the backend.

## Architecture

```
globestay-bookings/
├── src/              # React frontend (Vite + TypeScript)
│   ├── lib/api.ts    # Axios-based API client
│   ├── contexts/     # Auth, Booking, Favorites contexts
│   └── pages/        # App pages
└── server/           # Express + MongoDB backend
    └── src/
        ├── models/   # Mongoose models (User, Booking)
        ├── routes/   # REST API routes
        └── middleware/
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### 1. Backend

```bash
cd server
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET

npm run dev   # starts on http://localhost:5000
```

### 2. Frontend

```bash
# From project root
npm install

# Copy and configure environment
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api

npm run dev   # starts on http://localhost:5173
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in, returns JWT |
| POST | `/api/auth/logout` | Logout (client drops token) |
| GET  | `/api/auth/me` | Get current user |
| PATCH | `/api/auth/me` | Update display name |
| GET  | `/api/bookings` | List user's bookings |
| POST | `/api/bookings` | Create a booking |
| PATCH | `/api/bookings/:id/cancel` | Cancel a booking |
| GET  | `/api/favorites` | Get user's favorites |
| POST | `/api/favorites/:hotelId/toggle` | Toggle a favorite |
