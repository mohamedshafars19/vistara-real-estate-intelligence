# vistara-real-estate-intelligence — Vistara Real Estate Intelligence Platform

> **Find a Home That Fits Your Life.**  
> A lifestyle-first, multi-role spatial real estate intelligence platform engineered for Chennai's premier residential enclaves.

[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-000000?logo=vercel&logoColor=white)](https://vercel.com/)

---

## 🌟 Overview

**Vistara** reimagines real estate discovery by elevating human lifestyle compatibility over rigid square-footage listings. Built with a unified multi-role architecture, Vistara bridges **Home Seekers**, **Property Sellers**, and **Advisory Agents** within a responsive, high-performance spatial interface.

### 🔑 Three Unified Operational Portals

1. **Home Seeker Experience**
   - **LifeFit 7-Axis Matching**: Algorithmic scoring evaluating natural daylight, acoustic tranquility, spatial flow, commute tolerance, green canopy density, and financial harmony.
   - **Sunlight & Golden Hour Simulator**: Time-of-day solar simulation (6:00 AM – 9:00 PM) projecting azimuth, shadow angles, and natural lighting.
   - **3D Spatial Walkthroughs**: Interactive floor plans, virtual tours, and side-by-side architectural finishes comparison.
   - **Compare Arena & Decision Room**: Multi-dimensional head-to-head comparison of shortlisted properties with trade-off synthesis.
   - **Financial Studio**: Interactive mortgage EMI calculator, total monthly outflow estimates, and Rent vs. Buy simulation.
   - **Commute & Neighborhood Pulse**: Peak and off-peak travel times to OMR, Guindy, Airport, and Central stations, coupled with hyper-local decibel and canopy telemetry.

2. **Seller Operations Studio**
   - **9-Phase Listing Wizard**: Structured architectural specifications, coordinate mapping, and photo asset pipelines.
   - **Pricing Intelligence**: Micro-market trend benchmarks, fair-value index meters, and listing completeness ratings.
   - **Lead & Inquiry Hub**: Direct buyer scheduling, document verification, and viewing management.

3. **Agent Matching CRM**
   - **Client Relationship Portfolio**: Client tracking, buyer intent synthesis, and matched property pipelines.
   - **Viewing Schedules**: Calendar export, walkthrough dispatch, and transaction pipeline analytics.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19 (`react`, `react-dom`), Vite 8 (ESM Native) |
| **Styling & Design System** | Tailwind CSS 3, Custom Architectural Design System (Dark / Light / Golden Hour) |
| **3D & Spatial Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Mapping & Geospatial** | Leaflet, `react-leaflet`, OpenStreetMap / MapLibre compatibility |
| **Animation & Micro-interactions** | Framer Motion, Canvas Confetti |
| **Data Visualization & Icons** | Recharts, Lucide React (`lucide-react`) |
| **Linting & Code Quality** | Oxlint |
| **Hosting & Deployment** | Vercel SPA (Static Site Generation / History API rewrites) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js (v18.0.0 or higher)** and **npm** installed.

```bash
node -v
npm -v
```

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/mohamedshafars19/vistara-real-estate-intelligence.git
cd vistara-real-estate-intelligence
npm install
```

### Development Mode

Start the Vite local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

Create an optimized, minified production build:

```bash
npm run build
```

The output bundle will be generated in the `dist/` directory.

### Preview Production Build

Preview the compiled distribution locally:

```bash
npm run preview
```

---

## 🌐 Vercel Deployment

This project is pre-configured for seamless zero-configuration deployment on **Vercel**.

### Configuration Summary

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### SPA Routing & Rewrites

The application includes a production-ready `vercel.json` handling Single Page Application (SPA) routing, asset caching, and clean URL history:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environment Variables on Vercel

The application is engineered with an **offline-first, zero-runtime-dependency architecture**. All algorithms, lifestyle matching scores, interactive maps, and 3D simulations run out-of-the-box with built-in client data fallbacks.

If you wish to configure optional external services (such as custom map tile providers or AI APIs), add them under **Project Settings > Environment Variables** on Vercel:

| Variable | Description | Default / Fallback |
| :--- | :--- | :--- |
| `VITE_MAP_API_KEY` | Optional Mapbox / MapLibre key | Falls back to OpenStreetMap free tiles |
| `VITE_AI_API_KEY` | Optional AI / NLP endpoint key | Falls back to built-in heuristic parser |
| `VITE_APP_ENV` | Application environment indicator | `production` |

Refer to [`.env.example`](./.env.example) for placeholder definitions.

---

## 📁 Project Architecture

```
vistara-real-estate-intelligence/
├── public/                 # Static assets (favicon, SVG icons)
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Modular reusable UI components
│   │   ├── common/         # Modals, buttons, badges, error boundary
│   │   ├── layout/         # Dynamic navbars (Public, Seeker, Seller, Agent)
│   │   └── ui/             # Design system atomic primitives
│   ├── context/            # Global AppContext (auth, role, preferences)
│   ├── data/               # Properties, capabilities, neighborhood metrics
│   ├── i18n/               # Localization strings
│   ├── lib/                # Utility helpers (cn, tailwind merge)
│   ├── pages/              # Portal pages (Public, Seeker, Seller, Agent, Auth)
│   ├── utils/              # LifeFit scoring engine, EMI math, date formatters
│   ├── App.jsx             # Main application orchestrator & route guards
│   ├── App.css             # Base layout styles
│   ├── index.css           # Tailwind directives & CSS design tokens
│   └── main.jsx            # React root mount point
├── .env.example            # Environment template with safe placeholders
├── .gitignore              # Excludes node_modules, dist, secrets, IDE files
├── index.html              # HTML entry point with meta tags & preconnect fonts
├── package.json            # Scripts and project dependencies
├── tailwind.config.js      # Palette and typography theme tokens
├── vercel.json             # Vercel SPA rewrites and cache-control headers
└── vite.config.js          # Vite build plugin configuration & path aliases
```

---

## 🔒 Security & Privacy

- No sensitive credentials, secrets, or private keys are committed.
- All real environment files (`.env`, `.env.*`) and local scratch migration scripts are strictly excluded via `.gitignore`.
- State is preserved locally via client-side storage with zero tracking.

---

## 📄 License

This project is licensed under the MIT License — see the repository for details.
