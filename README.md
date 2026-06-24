# Yatravia — Meghalaya Tourism Clone

A beautiful MERN stack clone inspired by the Meghalaya Tourism website.

## 🏔️ Project Structure

```
yatravia/
├── backend/           # Express.js + MongoDB API
│   ├── models/        # Mongoose models (Destination, Experience)
│   ├── routes/        # API routes
│   ├── server.js      # Entry point
│   └── .env           # Environment variables
└── frontend/          # Vite + React
    ├── src/
    │   ├── components/ # Navbar, Hero, Footer, Sections
    │   └── pages/      # Home, Destinations, Experiences, Contact
    └── public/images/  # AI-generated destination images
```

## 🚀 Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

### 3. (Optional) Seed MongoDB

If MongoDB is running, seed with:
```bash
cd backend
node data/seed.js
```

> **Note:** The app works fully without MongoDB — all pages have static fallback data built in.

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home (Hero, Stats, Destinations, Experiences, About) |
| `/destinations` | All destinations with search & filter |
| `/destinations/:id` | Destination detail page |
| `/experiences` | Interactive experience explorer |
| `/contact` | Contact form |

## 🎨 Tech Stack

- **Frontend:** React 18, Vite, React Router, Axios
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Fonts:** Montserrat, Raleway, Playfair Display
- **Images:** AI-generated with Google DeepMind Antigravity

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/destinations` | All destinations |
| GET | `/api/destinations/:id` | Single destination |
| POST | `/api/destinations` | Create destination |
| GET | `/api/experiences` | All experiences |
| POST | `/api/contact` | Submit contact form |
