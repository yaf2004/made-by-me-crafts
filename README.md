# Bedazzling — Made by Me Crafts Event Site

A self-hosted RSVP & event site for **Made by Me Crafts** — no external platform dependency.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind + shadcn/ui |
| Backend | Express.js (Node) |
| Database | SQLite via better-sqlite3 |
| File uploads | Multer (stored locally in `backend/uploads/`) |

## Quick start

```bash
# 1. Install everything
npm run install:all

# 2. Start both servers in parallel
npm run dev
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:3001/api

## Project structure

```
project/
├── frontend/          # Vite + React app
│   └── src/
│       ├── api/client.js               # Fetch wrapper
│       ├── components/craft/
│       │   ├── packages.js             # ← Edit event details & activities here
│       │   ├── Hero.jsx
│       │   ├── CraftCurriculum.jsx
│       │   ├── PackageCard.jsx
│       │   ├── RSVPForm.jsx
│       │   └── SiteFooter.jsx
│       └── pages/Home.jsx
├── backend/           # Express API
│   ├── server.js
│   ├── routes/
│   │   ├── rsvp.js    # POST /api/rsvp, GET /api/rsvp, PATCH /api/rsvp/:id/status
│   │   └── upload.js  # POST /api/upload → { file_url }
│   ├── uploads/       # Payment screenshots stored here
│   └── db.sqlite      # Auto-created on first run
└── package.json       # Root scripts (concurrently)
```

## Customising event details

Everything lives in one file — edit it and the whole site updates:

```
frontend/src/components/craft/packages.js
```

- `eventDetails` — name, date, venue, entrance fee, contact links
- `packages` — craft activities with names, prices, descriptions
- `alsoHappening` — open mic, music, vendors, networking

## API reference

### POST /api/rsvp
Submit an RSVP. Required: `full_name`, `email`, `selected_package`.

### GET /api/rsvp
List all RSVPs (protect this route in production).

### PATCH /api/rsvp/:id/status
Update status: `"pending"`, `"confirmed"`, or `"declined"`.

### POST /api/upload
Upload a payment screenshot (multipart, field: `file`). Returns `{ file_url }`.

## Deployment

**Frontend:** `npm run build --prefix frontend` → deploy `frontend/dist/` to Vercel, Netlify, or Cloudflare Pages.

**Backend:** Deploy `backend/` to Railway, Render, Fly.io, or any Node host. Set `FRONTEND_URL` in `.env`.

Set `VITE_API_URL` in `frontend/.env` to your production backend URL before building the frontend.
