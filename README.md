
# Multimedia Search — Frontend

Single-page React application built with Vite. The UI provides authentication, file upload, gallery/listing, and search capabilities against the backend API.

Overview
- Users can register and log in, upload images/media, view uploaded items and search by filename, tags or other metadata.
- Uses cookie-based JWT auth (backend sets the cookie) and stores an access token in `localStorage` for API requests when present.

Tech stack
- React + Vite
- Redux Toolkit for state management
- Axios for API requests
- Sass for styles

Project structure (high level)
- `src/main.jsx` — app entry
- `src/App.jsx` — routes and top-level layout
- `src/pages` — page components (Auth, Dashboard)
- `src/components` — reusable UI components (FileCard, FilePreview)
- `src/features` — Redux slices
- `src/services/api.js` — Axios instance and baseURL

Install

```bash
npm install
```

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Environment variables
- Copy `.env.example` to `.env` and set `VITE_API_URL` to point to your backend API (default `http://localhost:5001/api`).

Running with backend
- Make sure the backend is running and reachable at `VITE_API_URL`.
- The frontend will send requests to the backend and rely on cookies for session state; ensure CORS and credentials are configured in the backend.

Testing & linting
- No frontend tests included by default. Use `npm run build` and `npm run preview` to validate production build.

Deployment
- The build output is produced in `dist/` by `npm run build`. Serve it with any static hosting (Netlify, Vercel, CDN, or a static file server).

Troubleshooting
- If images or uploads fail, verify `VITE_API_URL` and backend logs.
- If authentication fails, check cookie domain/path and CORS `credentials: true` settings on the backend.

Contribution
- Feel free to open PRs to improve UI, add tests, or harden error handling.

