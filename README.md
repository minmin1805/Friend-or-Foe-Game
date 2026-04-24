# Friend or Foe

An educational **web game** for young teens that teaches **social‑media safety** and **scam awareness**. You play as a “detective” reviewing **friend requests**: open each profile, look for **red flags**, and choose **Accept** or **Reject**. After each decision you get **feedback**; at the end you see your **score**, **badge**, and a **leaderboard** of other players (stored in the database).

> **Tagline:** *Can you spot the fake account?*

The experience is designed to feel like a light social app (home feed, profile views, friends and photos) while the content is **fiction** for learning—not a real network.

---

## What you do in the game

1. **Content warning** → **Welcome** — Enter a detective name and create a player session.
2. **How to play** — Short instructions: what to look at (photo, bio, location, account age, friends, posts) and what kinds of things to **flag** as suspicious.
3. **Game** — You see a list of **friend request cards** (e.g. 10 profiles). Open any card in any order, investigate the profile, flag odd details, then **Accept** or **Reject**.
4. **Feedback** — The game tells you whether the account was real or fake and highlights what to notice next time.
5. **Endgame** — Total score, badge, recap, and leaderboard.

Audio includes **UI sounds** and optional **background music** (with a toggle).

---

## Tech stack

| Layer | Technology |
|--------|------------|
| **Frontend** | [React](https://react.dev/) 19, [Vite](https://vitejs.dev/) 7, [React Router](https://reactrouter.com/) 7 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 4 with [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) |
| **HTTP client** | [Axios](https://axios-http.com/) |
| **SFX / music** | [use-sound](https://github.com/joshwcomeau/use-sound) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Backend** | [Node.js](https://nodejs.org/) (ES modules), [Express](https://expressjs.com/) 5 |
| **Database** | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) 9 |
| **Config** | [dotenv](https://github.com/motdotla/dotenv#readme), [CORS](https://github.com/expressjs/cors#readme) |

**Production build:** the frontend is built to static files (`frontend/dist/`), and the Express app serves that folder and **falls through to `index.html`** for client-side routing when `NODE_ENV=production`.

### Planned / in-docs content

The repo includes design docs for a second experience, **Inbox Inspector** (email/DM safety, tools, verdicts, reply grading). See `docs/INBOX_INSPECTOR_BUILD_PLAN.md` and `docs/inboxInspectorLevels.json`. It is not necessarily wired in the app yet; the **live routes** in `frontend/src/App.jsx` are the **Friend or Foe** flow above.

---

## Requirements

Before you run the project locally, install:

| Requirement | Notes |
|-------------|--------|
| **Node.js** | **v18 LTS or newer** (v20+ recommended). [Download](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm). |
| **npm** | Comes with Node.js (or use `corepack` / pnpm if you adapt commands yourself). |
| **MongoDB** | A **running MongoDB 5+** instance the API can reach. Use **MongoDB Atlas** (cloud) or **Docker** / local install. The server **exits** if it cannot connect (see `backend/lib/db.js`). |

No separate database UI is required; any client that can create a connection string works.

---

## Project layout (short)

```text
Friend or Foe/
├── backend/              # Express API, Mongoose models, routes
│   ├── server.js         # App entry, static SPA in production
│   ├── lib/db.js         # MongoDB connection
│   ├── models/
│   ├── routes/
│   └── controllers/
├── frontend/             # Vite + React app
│   ├── src/              # Pages, components, context, services
│   └── vite.config.js    # Dev proxy: /api → http://localhost:8000
├── docs/                 # Design notes, level data JSON
├── package.json          # Root scripts: start, dev, build
└── .env                  # You create this (not committed) — see below
```

---

## Run on your local machine

### 1. Clone the repository

```bash
git clone <your-fork-or-remote-url> "friend-or-foe"
cd "friend-or-foe"
```

### 2. Install dependencies

**Root (backend + orchestration):**

```bash
npm install
```

**Frontend:**

```bash
cd frontend
npm install
cd ..
```

Or use the root `build` script to install both (useful for deployment):

```bash
npm run build
```

(That also runs the Vite build; for **daily development** you usually use the two dev servers below instead.)

### 3. Configure environment variables

In the **repository root** (next to `package.json`), create a file named **`.env`**:

```env
# Required — MongoDB connection string
MONGO_URI=mongodb://127.0.0.1:27017/friend-or-foe
# MONGO_URI=mongodb+srv://USER:PASS@cluster.example.mongodb.net/friend-or-foe?retryWrites=true&w=majority

# Optional — API port (default 8000)
PORT=8000
```

- Replace `MONGO_URI` with your real URI (local or Atlas).
- **Do not** commit `.env` (keep secrets out of git).

### 4. Start MongoDB

- **Atlas:** create a cluster, allow your IP, copy the SRV connection string into `MONGO_URI`.
- **Local:** e.g. `brew services start mongodb-community` (macOS) or `docker run -p 27017:27017 mongo` — your URI must match.

### 5. Run the app in development (two terminals)

The Vite dev server **proxies** `HTTP` requests to `/api` to the backend (see `frontend/vite.config.js`), so you run **both** processes.

**Terminal A — API (default port 8000):**

```bash
cd /path/to/friend-or-foe
npm run dev
```

You should see something like: `Server is running on port 8000` and `MongoDB connected: ...`

**Terminal B — frontend (Vite, default port 5173):**

```bash
cd /path/to/friend-or-foe/frontend
npm run dev
```

Open a browser at the URL Vite prints (usually **http://localhost:5173**). Navigate through **/** → **welcome** → the rest of the game; API calls go to the same origin and are proxied to the backend.

### 6. Production-style run (single server)

Build the client and start Express with `NODE_ENV=production` so the API **and** the built SPA are served from one port:

```bash
npm run build
NODE_ENV=production npm start
```

Then open **http://localhost:8000** (or the port in `PORT`). All routes are handled by the React app after static files.

---

## Useful npm scripts

| Command | Where | What it does |
|--------|--------|----------------|
| `npm run dev` | Root | **nodemon** — restarts `backend/server.js` on changes |
| `npm start` | Root | Production server: `node backend/server.js` |
| `npm run build` | Root | `npm install` in root and frontend, then **Vite build** |
| `npm run dev` | `frontend/` | Vite HMR dev server (proxies `/api` → port 8000) |
| `npm run build` | `frontend/` | Output to `frontend/dist/` |
| `npm run preview` | `frontend/` | Preview the built static site (no Express; API calls need proxy or CORS in real use) |

---

## API (current)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/players` | Create player: body `{ "username": "..." }` → `{ id, sessionId, name }` |
| `PATCH` | `/api/players/:id` | Update `score`, `correctDecisions`, `badge`, `completedAt` |
| `GET` | `/api/players/leaderboard?limit=4` | Top players with completed games |

In development, the frontend uses **relative** URLs like `/api/players` (see `frontend/src/services/playerService.js`).

---

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| **Server exits immediately** | `MONGO_URI` wrong or Mongo not running; check terminal error from `connectDB()`. |
| **Frontend: “Unable to start game”** | Backend not running, or not on the port the Vite proxy expects (`8000` unless you change `vite.config.js`). |
| **Blank page in production** | Run `npm run build` before `NODE_ENV=production npm start`; ensure `frontend/dist` exists. |
| **CORS errors in dev** | Prefer opening the **Vite** URL (`5173`) so `/api` is same-origin and proxied—don’t point the dev client at the raw API origin unless you configure CORS for that. |

---

## License

See `package.json` (`license` field) unless the maintainers add a separate `LICENSE` file.

---

*Built for learning: spot fake accounts, build safer habits, and have fun doing it.*
