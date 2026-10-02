# 🛡️ CLIMATESHIELD — Hyperlocal Climate Risk & Safety Assistant

> **"Don't just check the weather. Know if it's safe to go outside, why, and what to do."**

ClimateShield is a production-ready, full-stack climate intelligence and safety platform inspired by sovereign environmental command nodes (such as ClimateAI). It fuses real-time meteorological observations, time-series machine learning models, an authoritative deterministic multi-criteria decision engine, and Google Gemini Generative AI into a unified, atmospheric, human-centric decision system.

---

## 🌟 Core Product Vision

Traditional weather apps display raw numbers that force users to interpret environmental risks themselves:
```text
Temperature: 39°C | Humidity: 68% | AQI: 220 | Wind: 28 km/h
```
ClimateShield answers the central question:
> **"How safe is it to go outside right now?"**
> **"72 / 100 — HIGH RISK. Outdoor activity requires caution today."**
> **"Why? High humidity is elevating the apparent temperature to 44°C, while elevated particulate matter (AQI 220) adds severe respiratory exertion risk."**

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Frontend Layer (React 19 + Vite 8)"]
        UI[Atmospheric Background Canvas & Glass Panels]
        Nav[Top Navigation: Overview | Forecast | Risk | History | Insights]
        Hero[Hero Command Center & Dynamic Radial Ring]
        Float[Floating Weather Panel & Solar Horizon]
        Time[24h & 7-Day Forecast Timeline]
        Hist[Interactive SVG Risk Analytics & Trend Charts]
        Auth[JWT Profile & Personal Climate Preferences Modal]
        Chat[Floating Gemini AI Advisory Drawer]
    end

    subgraph API ["Backend API Layer (Express 4 / Vercel Serverless)"]
        Sec[Security Middleware: Helmet, CORS, Rate Limit]
        AuthMid[JWT Bearer Auth Middleware & Bcrypt Hashing]
        WCtrl[Weather Controller & Geocoding Service]
        RCtrl[Risk Controller & Telemetry Synthesis]
        ACtrl[AI Controller & Chat Pipeline]
        HCtrl[History & Assessment Audit Controller]
    end

    subgraph DualCore ["Dual Intelligence Core"]
        Det[Authoritative Deterministic Risk Engine<br/>Heat + Rain + AQI + Outdoor + Travel Multipliers]
        ML[Random Forest Machine Learning Engine<br/>Trained on 2,200+ Real Hourly Observations]
        Gemini[Google Gemini Generative AI<br/>Grounded Natural Language Safety Briefings]
    end

    subgraph Data ["Data & Telemetry Providers"]
        OM_W[Open-Meteo Weather API]
        OM_AQ[Open-Meteo Atmospheric Chemistry API]
        OM_GEO[Open-Meteo Global Geocoding API]
        OM_ARC[Open-Meteo Historical Archive API]
        MDB[(MongoDB Atlas / Resilient Cache)]
    end

    UI --> Sec
    Sec --> AuthMid
    AuthMid --> WCtrl & RCtrl & ACtrl & HCtrl
    WCtrl --> OM_W & OM_AQ & OM_GEO
    RCtrl --> Det & ML & Gemini
    ML -.-> OM_ARC
    HCtrl --> MDB
    AuthMid --> MDB
```

---

## 📁 Repository Structure

```text
CLIMATE SHIELD/
├── api/
│   └── index.js                   # Vercel serverless entrypoint exporting Express app
├── backend/
│   ├── config/
│   │   ├── constants.js           # WMO weather codes, user mode weights, risk thresholds
│   │   └── db.js                  # MongoDB Atlas connection manager with resilient fallback
│   ├── controllers/
│   │   ├── aiController.js        # Gemini advice and chat endpoints
│   │   ├── authController.js      # Register, login, profile, and climate preferences
│   │   ├── historyController.js   # Audit trail retrieval, creation, deletion
│   │   ├── riskController.js      # Unified deterministic + ML evaluation
│   │   └── weatherController.js   # Weather, geocoding, and forecast endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication and route guard
│   │   └── errorHandler.js      # Centralized error and 404 handler
│   ├── models/
│   │   ├── RiskAssessment.js      # Mongoose schema for environmental snapshots & scores
│   │   └── User.js                # Mongoose schema for users (bcrypt hashing, preferences)
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   ├── historyRoutes.js
│   │   ├── riskRoutes.js
│   │   └── weatherRoutes.js
│   ├── services/
│   │   ├── geminiService.js       # Google Gemini AI integration with deterministic fallback
│   │   ├── historyService.js      # Persistent audit log service
│   │   ├── mlService.js           # In-memory ML Random Forest inference engine
│   │   ├── riskService.js         # Authoritative deterministic multi-criteria risk engine
│   │   └── weatherService.js      # Open-Meteo ingestion, hourly/daily forecast parsing
│   ├── package.json
│   └── server.js                  # Server bootstrap (Express dev server & Vercel export)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChatDrawer.jsx           # Floating conversational AI advisor
│   │   │   ├── AICommandHero.jsx          # Cinematic natural-language AI analytics command hero
│   │   │   ├── AgentsDirectory.jsx        # 7 Sovereign AI Agent Nodes & execution console
│   │   │   ├── AtmosphericBackground.jsx  # Dynamic procedural weather sky + particle canvas
│   │   │   ├── AuthProfileModal.jsx       # Login, register, and personal preferences modal
│   │   │   ├── ClimateNodesBar.jsx        # Planetary telemetry ticker (CO2, Temp Anomaly, Ice)
│   │   │   ├── FloatingWeatherPanel.jsx   # Translucent glass panel with solar arc & telemetry
│   │   │   ├── ForecastTimeline.jsx       # 24-hour radar and 7-day outlook with risk badges
│   │   │   ├── HeroCommandCenter.jsx      # Dynamic radial ring gauge, "Why this score exists"
│   │   │   ├── HistoryAnalyticsView.jsx   # Longitudinal SVG charts (Risk, Temp, AQI) & audit log
│   │   │   ├── LocationSearchBar.jsx      # Global autocomplete city search
│   │   │   ├── ModeSelector.jsx           # Persona mode toggle (Student, Fitness, Commuter, etc.)
│   │   │   ├── ActivitySelector.jsx       # Planned activity toggle (College, Exercise, Cycling, etc.)
│   │   │   ├── Navbar.jsx                 # Top brand bar with interactive navigation tabs
│   │   │   ├── ScenarioSelector.jsx       # Academic preset scenarios (Delhi, Mumbai, etc.)
│   │   │   ├── StrategicNodesSimulator.jsx# What-if stress testing & adaptation barrier analysis
│   │   │   └── SystemGroundingCard.jsx    # Scientific telemetry sources, latency & math formulas
│   │   ├── services/
│   │   │   └── api.js                     # Unified fetch client for Express / Vercel API
│   │   ├── utils/
│   │   │   ├── constants.js               # Design tokens, persona weights, WMO weather codes
│   │   │   ├── formatters.js              # Color, temperature, risk level helpers
│   │   │   └── mockData.js                # Offline scenarios and deterministic client math
│   │   ├── App.jsx                        # Master dashboard routing and state assembly
│   │   └── index.css                      # Complete design-token system, glassmorphism, 60fps animations
│   ├── package.json
│   └── vite.config.js
├── ml/
│   ├── train_pipeline.py          # Python time-series ML training on real Open-Meteo archive data
│   └── model_report.json          # Honest validation metrics (Accuracy, F1, MAE, R²)
├── vercel.json                    # Monorepo full-stack serverless deployment configuration
└── README.md
```

---

## 🎨 Visual System & Dynamic Atmospheric Engine

### 1. Dynamic Procedural Background
Unlike basic dashboards with static dark backgrounds, ClimateShield computes an ambient environmental sky based on live telemetry and solar coordinates:
* **CLEAR (Day):** Soft cyan-blue atmospheric sky with subtle ambient particles.
* **CLEAR (Night):** Deep midnight navy gradient with twinkling stars rendered on HTML5 Canvas.
* **CLOUDY:** Muted blue-gray overcast sky with drifting ambient fog layers.
* **RAIN:** Dark moody storm-gray with delicate diagonal precipitation particle vectors.
* **STORM:** Deep dramatic charcoal atmosphere with distant soft lightning pulses.
* **SUNSET:** Warm amber-indigo dusk gradient calculated from solar horizon times.
* **FOG:** Low-contrast misty atmosphere with slow-drifting opacity particles.

### 2. Frosted Glassmorphism & Depth
All UI panels use `backdrop-filter: blur(24px) saturate(180%)`, soft borders (`rgba(255, 255, 255, 0.08)`), and deep elevation drop shadows (`0 16px 40px -12px rgba(0, 0, 0, 0.55)`).

---

## 🧮 Authoritative Deterministic Risk Engine

The numerical risk score is **never fabricated or generated by LLMs**. It is calculated mathematically using documented formulas:

### 1. Component Risks (0 - 100)
* **Heat Risk ($R_{heat}$):**
  $$R_{heat} = \begin{cases} 95, & T_{eff} \ge 42^\circ\text{C} \\ 80, & 38^\circ\text{C} \le T_{eff} < 42^\circ\text{C} \\ 60, & 33^\circ\text{C} \le T_{eff} < 38^\circ\text{C} \\ 40, & 28^\circ\text{C} \le T_{eff} < 33^\circ\text{C} \\ 55, & T_{eff} \le 10^\circ\text{C} \text{ (Cold Stress)} \\ 15, & \text{otherwise} \end{cases}$$
* **Rain Risk ($R_{rain}$):**
  $$R_{rain} = \min(100, \text{round}(P_{prob} \times 0.6 + \min(P_{mm}, 30) \times 1.33))$$
  *Spikes to $\ge 85$ for severe thunderstorms (WMO 95, 96, 99).*
* **Air Quality Risk ($R_{aqi}$):**
  Calculated from US EPA standard categories (Good $\to$ Hazardous). Spikes if $PM_{2.5} > 60\,\mu\text{g/m}^3$.

### 2. Multi-Criteria Persona Weighting
$$\text{Overall Score} = \min(100, \max(0, \text{round}(w_h R_{heat} + w_r R_{rain} + w_a R_{aqi} + w_o R_{outdoor} + w_t R_{travel})))$$

| Persona Mode | Heat ($w_h$) | Rain ($w_r$) | AQI ($w_a$) | Outdoor ($w_o$) | Travel ($w_t$) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Student** | 0.25 | 0.25 | 0.20 | 0.15 | 0.15 |
| **Fitness** | 0.30 | 0.10 | 0.35 | 0.20 | 0.05 |
| **Daily Commuter** | 0.15 | 0.35 | 0.15 | 0.10 | 0.25 |
| **Traveller** | 0.20 | 0.25 | 0.20 | 0.20 | 0.15 |
| **Farmer** | 0.35 | 0.30 | 0.10 | 0.15 | 0.10 |

---

## 🤖 Machine Learning Pipeline & Honest Evaluation

### 1. Ingestion of Real Environmental Data
The ML model is trained on **2,232 authentic hourly observations** ingested from the Open-Meteo Historical Archive API for New Delhi (June 1, 2026 to September 1, 2026).

### 2. Time-Aware Train / Test Split
To avoid data leakage, future observations were **never mixed** into the training set:
* **Training Set:** First 1,785 chronological observations (80%)
* **Holdout Test Set:** Last 447 chronological observations (20%)

### 3. Empirical Model Validation Results

```text
==================================================
1. CLASSIFICATION EVALUATION (Risk Category 0-3)
==================================================
Logistic Regression Baseline: Accuracy = 0.908 | Macro F1 = 0.763
Random Forest Classifier:    Accuracy = 1.000 | Precision = 1.000 | Recall = 1.000 | Macro F1 = 1.000

Confusion Matrix (Holdout Test Set):
[[381,   0],
 [  0,  66]]

==================================================
2. REGRESSION EVALUATION (Numerical Risk 0-100)
==================================================
Ridge Regression Baseline:  MAE = 2.11 | R² = 0.667
Random Forest Regressor:   MAE = 0.09 | RMSE = 0.29 | R² = 0.996

Feature Importances:
  1. feels_like (Apparent Temperature) : 52.4%
  2. precip (Precipitation Volume)    : 20.2%
  3. weather_code (WMO Severe Dynamics): 17.2%
  4. wind_speed (Surface Wind Speed)   :  9.9%
  5. temp (Dry Bulb Temperature)      :  0.2%
```

---

## 🧠 Google Gemini Generative AI Layer

Gemini generates empathetic, context-aware safety guidance:
1. **Strict Guardrail:** Gemini is provided the deterministic risk score and verdict as hard constraints. It is forbidden from altering the numerical score.
2. **Context Tailoring:** Synthesizes advice customized to the user's active persona (e.g. Student transit warnings vs. Fitness cardio precautions).
3. **Deterministic Fallback:** If the Gemini API is unreachable, unconfigured, or rate-limited, [`generateFallbackAdvice`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/backend/services/geminiService.js) serves complete rule-based guidance instantly without UI disruption.

---

## 🔒 Security & Authentication Architecture

1. **Password Hashing:** Passwords hashed with `bcryptjs` using a salt work factor of 10. Plain-text passwords and password hashes are never stored in localStorage or returned in JSON responses (`select: false`).
2. **JWT Authorization:** Stateless Bearer tokens signed with `jsonwebtoken` valid for 7 days.
3. **Protected Endpoints:** Middleware guard on `/api/auth/me` and `/api/auth/preferences`.
4. **Resilient Persistence:** Connects to MongoDB Atlas if `MONGO_URI` is present; gracefully switches to an encrypted in-memory fallback during local testing.

---

## ⚡ API Reference

### Health & System Status
* `GET /api/health` — Server health, MongoDB connection status, Gemini configuration.
* `GET /api` — Live API catalog and endpoint documentation.

### Authentication
* `POST /api/auth/register` — Create user account (`name`, `email`, `password`, `preferences`).
* `POST /api/auth/login` — Sign in and obtain JWT token (`email`, `password`).
* `GET /api/auth/me` — Retrieve current authenticated user profile (`Bearer <token>`).
* `PUT /api/auth/preferences` — Update personal climate preferences (`Bearer <token>`).

### Meteorological, Risk & Autonomous Agent Telemetry
* `GET /api/weather?lat={lat}&lon={lon}&name={name}` — Real-time weather, AQI, sunrise/sunset, 24h hourly & 7-day forecast.
* `GET /api/weather/search?q={query}` — Worldwide city autocomplete geocoding.
* `POST /api/risk/evaluate` — Authoritative deterministic score + ML prediction + Gemini natural language briefing.
* `POST /api/risk/ml-predict` — Standalone Random Forest ML inference.
* `POST /api/ai/chat` — Conversational climate safety advisor chat.
* `POST /api/ai/agent-analyze` — Execute a Sovereign Intelligence Agent Node (`agentId`, `telemetry`, `customQuery`).

### 🤖 7 Sovereign Autonomous Climate Intelligence Nodes
Inspired by the sovereign intelligence architectures of high-end research platforms (e.g., ClimateAI), ClimateShield implements 7 specialized autonomous nodes:
1. **NODE-01 // WX-MESO (Atmospheric Analyst):** Computes barometric gradients, dew point depression, convective precipitation instability, and solar erythema UV flux.
2. **NODE-02 // AQ-AEROSOL (Aerosol Analyst):** Measures respirable particulate loading (PM2.5 / PM10) vs WHO 24-hour limit (15 µg/m³) and assesses alveolar deposition risks.
3. **NODE-03 // RSK-DET (Institutional Risk Architect):** Deconstructs the 5-vector deterministic matrix, identifies the dominant hazard driver, and calculates compound risk multipliers.
4. **NODE-04 // BIO-EXP (Outdoor Activity Advisor):** Models metabolic thermal stress, dehydration kinetics (mL/hr water replacement), and identifies diurnal safe activity windows.
5. **NODE-05 // MOB-TRANS (Transit & Urban Mobility Analyst):** Calculates vehicle braking distance multipliers (e.g. 1.45x on wet roads), atmospheric sightline visibility, and commuter delay buffers.
6. **NODE-06 // GEO-TREND (Geophysical & Trend Analyst):** Evaluates multi-day temperature anomalies (+1.15°C climatological deviation), synoptic pressure ridges, and 7-day persistence.
7. **NODE-07 // CARB-FOOT (Sovereign Carbon & Personal Impact Analyst):** Estimates daily commuter lifecycle emissions (car vs metro vs cycle) and cooling thermal loads (kWh/day).

### History & Assessment Audit
* `GET /api/history` — Retrieve assessment audit log.
* `POST /api/history` — Log new assessment snapshot.
* `DELETE /api/history/:id` — Delete individual record.
* `DELETE /api/history` — Clear entire history log.

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
* Node.js v18+ (tested on Node.js v20/v24)
* Python 3.10+ (for running the ML training pipeline)
* Free Open-Meteo access (no API key required)
* Free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Configure `.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
# Optional MongoDB Atlas URI (uses resilient local store if unset)
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/climateshield
```
Start the backend server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 4. Running the Machine Learning Pipeline
```bash
# In the project root
python ml/train_pipeline.py
```

---

## 🌐 Real-World Data vs. Mock Data Transparency Matrix

ClimateShield operates primarily on **live real-world atmospheric telemetry**. It does not rely on synthetic mock weather. Offline fallbacks exist exclusively as safety nets to ensure high availability if third-party APIs encounter outages or rate limits:

| Feature / Domain | Primary Data Source | Live / Real-World? | Description & Fallback Strategy |
| :--- | :--- | :--- | :--- |
| **Current Weather & Telemetry** | [Open-Meteo API](https://open-meteo.com) | ✅ **Live Real-World** | Fetches real-time temperature, apparent feels-like, relative humidity, precipitation, wind speed, UV index, and WMO weather codes. Fallback estimates only activate on network timeout. |
| **Air Quality & Atmospheric Chemistry** | [Open-Meteo Air Quality Network](https://air-quality-api.open-meteo.com) | ✅ **Live Real-World** | Ingests live US AQI, European AQI, PM2.5, PM10, CO, NO₂, SO₂, and Ozone (O₃) concentrations. |
| **Global Geocoding & City Search** | Open-Meteo Geocoding API | ✅ **Live Real-World** | Real-time worldwide search across millions of cities, coordinates, and admin divisions. |
| **Reverse Geocoding** | BigDataCloud API | ✅ **Live Real-World** | Resolves user GPS coordinates to city, administrative district, and country name. |
| **Machine Learning Model** | Open-Meteo Historical Archive API | ✅ **Trained on Real Data** | Ingested 2,232 authentic historical hourly observations from New Delhi (`ml/train_pipeline.py`). Random Forest trained on strict chronological holdout splits ($R^2 = 0.996$). |
| **Deterministic Risk Engine** | Scientific Equations | ✅ **Mathematical Rigor** | Computes Heat Index, particulate exposure multipliers, wet surface friction, and persona weights. |
| **Generative AI Briefings** | Google Gemini (`gemini-3.5-flash`) | ✅ **Live AI Model** | Live Gemini LLM calls conditioned on active telemetry. If quota is exceeded (429), our sovereign fallback synthesizer generates a grounded briefing. |
| **Database & History** | MongoDB Atlas / Mongoose | ✅ **Production Database** | Persists user accounts (bcrypt passwords), custom preferences, and timestamped climate risk audit logs. |

---

## 🗄️ Database Setup & Connection Guide (MongoDB Atlas)

ClimateShield uses **MongoDB Atlas** for persistent storage of users, preferences, and risk logs, managed by Mongoose with a **resilient zero-crash fallback**.

### How to Connect MongoDB Atlas:
1. **Create a Free Cluster**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free Shared M0 cluster.
2. **Create Database User**:
   - Under **Database Access**, create a user with a secure password (e.g., `climateshield_user`).
3. **Configure Network Access**:
   - Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`) for cloud deployment.
4. **Copy Connection String**:
   - Click **Connect** -> **Drivers** (Node.js) and copy the connection URI:
     ```text
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/climateshield?retryWrites=true&w=majority
     ```
5. **Add to Environment Variables**:
   - In `backend/.env` (and in Vercel Project Settings):
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/climateshield?retryWrites=true&w=majority
     ```
6. **Automatic Verification**:
   - On server startup, [`backend/config/db.js`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/backend/config/db.js) logs:
     `[Database] MongoDB Atlas Connected: cluster0.abcde.mongodb.net/climateshield`
   - If `MONGO_URI` is omitted or temporarily unreachable, the app automatically switches to its internal local cache so the frontend never crashes.

---

## 🛠️ Challenges Faced During Development & How We Resolved Them

During the end-to-end development of ClimateShield, several challenging UI, UX, and architectural hurdles were systematically diagnosed and resolved:

| # | Challenge Encountered | Root Cause | Engineering Solution & Resolution |
| :-: | :--- | :--- | :--- |
| **1** | **Blank Blue Screen on "Student" Persona** | The `App.jsx` component rendered an authentication trigger calling `handleLogin` / `handleRegister`, but these handler functions had not been declared in scope, triggering an uncaught runtime ReferenceError when selecting personas. | Declared comprehensive `handleLogin` and `handleRegister` handlers in [`App.jsx`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/frontend/src/App.jsx) with state updates and localStorage persistence, completely preventing dashboard crashes. |
| **2** | **Thick White Scrollbar Ruining Dark Aesthetics** | Native browser scrollbars on the horizontal forecast timeline (`.timeline-scroll-track`) defaulted to bright white OS chrome, clashing with the sleek dark glassmorphic design. | Implemented custom dark glass scrollbars in [`index.css`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/frontend/src/index.css) using `scrollbar-width: thin` and `scrollbar-color: rgba(56, 189, 248, 0.3) rgba(15, 23, 42, 0.6)`, plus universal `::-webkit-scrollbar` styling. |
| **3** | **Humidity Metric Clipped / Not Visible** | The floating weather telemetry panel used an inline flex/overflow layout that pushed the fourth metric card (Humidity) off-screen or caused text truncation on standard viewport resolutions. | Refactored `.floating-telemetry-grid` into a balanced `grid-template-columns: repeat(2, 1fr)` 2×2 layout with dedicated min-heights and padding, ensuring Precipitation, Humidity, Wind, and UV Index are always 100% visible. |
| **4** | **"ANALYZE ENVIRONMENT" Button Unclickable** | The button had `disabled={isAnalyzing || !query.trim()}`. When the user landed on the page with an empty input (only placeholder visible), the button had `cursor: not-allowed` and refused all clicks. | Updated the button to `disabled={isAnalyzing}` (always clickable). If clicked with empty text, it automatically submits a comprehensive default environmental briefing prompt and populates the input field. |
| **5** | **Google Gemini Free-Tier Quota Limit (429 Too Many Requests)** | When rapid test requests exhausted Google Gemini free-tier daily requests, the chat endpoint returned raw API error strings to the user. | Implemented a sovereign fallback synthesizer in [`geminiService.js`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/backend/services/geminiService.js) that intercepts errors and synthesizes an intelligent, persona-calibrated safety briefing grounded on live sensor telemetry. |
| **6** | **Mobile Responsiveness & Viewport Wrapping** | Fixed-width desktop headers and split grids caused horizontal scrolling and text overlap on mobile devices (<768px). | Engineered comprehensive mobile CSS media queries (`@media (max-width: 900px)` and `768px`) across `HeroCommandCenter`, `ForecastTimeline`, and `AICommandHero`, converting split layouts to single-column vertical stacks. |

---

## 🚀 Step-by-Step Vercel Deployment & Git Guide

### 1. Committing All Changes to Git
To commit all modified and new project files to your GitHub repository:
```bash
# 1. Check all changed and untracked files
git status

# 2. Stage all files (frontend, backend, ML, configuration)
git add .

# 3. Commit with a clear production message
git commit -m "feat: complete ClimateShield production release with responsive UI, live telemetry, and AI resilience"

# 4. Push to your main GitHub branch
git push origin main
```

### 2. Deploying on Vercel
ClimateShield includes a root [`vercel.json`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/vercel.json) and serverless entrypoint [`api/index.js`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/api/index.js) pre-configured for full-stack deployment:
1. Log in to [Vercel](https://vercel.com/) and click **Add New...** -> **Project**.
2. Select and import your `CLIMATE-SHIELD` GitHub repository.
3. Configure **Environment Variables** in the Vercel dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `GEMINI_MODEL`: `gemini-3.5-flash`
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for authentication tokens.
   - `CLIENT_URL`: Your Vercel production URL (e.g. `https://climate-shield.vercel.app`).
4. Click **Deploy**. Vercel will build the frontend (`frontend/dist`) and deploy the Express API as a serverless function (`/api/*`).

---

## 🎓 30 Viva Questions & Rigorous Answers

<details>
<summary><strong>Click to expand 30 Viva Questions & Detailed Answers</strong></summary>

### Category 1: Architecture & Full-Stack Fundamentals
1. **Q: What is the high-level architecture of ClimateShield?**  
   **A:** ClimateShield follows a decoupled client-server architecture. The frontend is built with React 19 and Vite 8, featuring an atmospheric background system and glassmorphism UI. The backend is an Express 4 REST API that acts as a secure proxy, ingesting live telemetry from Open-Meteo, executing a deterministic risk formula, running a Random Forest ML model, generating natural language briefings via Google Gemini, and persisting audit records to MongoDB Atlas.

2. **Q: Why should React never communicate directly with MongoDB?**  
   **A:** Direct database connections from the browser would expose database credentials, connection strings, and query logic in client-side bundles. Anyone opening Chrome DevTools could read the database credentials or execute arbitrary delete/drop queries. All database access must be mediated through an authenticated backend API.

3. **Q: How does Vite differ from traditional Webpack in local development?**  
   **A:** Vite leverages native ES Modules (ESM) in modern browsers and uses `esbuild` (written in Go) for pre-bundling dependencies. Instead of bundling the entire application on every change like Webpack, Vite serves source code on demand over native ESM, resulting in instant server start and millisecond Hot Module Replacement (HMR).

4. **Q: What is the purpose of CORS and how is it configured in ClimateShield?**  
   **A:** Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks web pages from making AJAX requests to a different domain/port than the one that served the page. In ClimateShield, Express uses the `cors` package to whitelist requests originating from `http://localhost:5173` in development and the production domain on Vercel.

5. **Q: What is the difference between client-side deterministic evaluation and backend evaluation in ClimateShield?**  
   **A:** The client executes an instant optimistic deterministic evaluation so the user experiences zero UI lag when toggling personas or activities. Simultaneously, a request is dispatched to the backend to run ML validation, synthesize Gemini natural language advice, and write an immutable audit log into the database.

---

### Category 2: Risk Engine & Meteorological Data
6. **Q: Why use a deterministic risk engine instead of letting Gemini calculate the risk score?**  
   **A:** Large Language Models are non-deterministic and prone to hallucinations, numerical drift, and prompt injection. If an LLM generated the risk score, the same weather conditions could return a score of 40 one minute and 85 the next. ClimateShield enforces strict Responsible AI: the mathematical formula is authoritative, auditable, and transparent, while Gemini is restricted to synthesizing human-centric explanations.

7. **Q: What parameters are ingested from Open-Meteo?**  
   **A:** Temperature (2m), relative humidity, apparent (feels-like) temperature, precipitation probability, precipitation volume (mm), wind speed (10m), WMO weather interpretation code, daily max/min temperatures, solar sunrise and sunset timestamps, and air quality metrics (US AQI, PM2.5, PM10, European AQI).

8. **Q: What is the difference between precipitation probability and forecast reliability?**  
   **A:** Precipitation probability is the physical likelihood of rain occurring at a given point. Forecast reliability is a meta-metric estimating model confidence. In convective thunderstorm regimes (WMO 95-99) or high-wind fronts, radar variance is volatile, so model confidence drops even if rain probability is high.

9. **Q: How does the heat index risk formula account for humidity?**  
   **A:** The engine evaluates apparent temperature ($T_{eff}$), which incorporates the evaporative cooling impairment caused by high relative humidity. At high humidity, human sweat cannot evaporate efficiently, sharply elevating internal thermal stress even if the dry-bulb thermometer temperature is moderate.

10. **Q: How do persona weights alter the risk score?**  
    **A:** Different activities expose humans to different hazards. A "Fitness" persona exercising vigorously outdoors has a high weight on particulate air quality ($w_a = 0.35$) and heat ($w_h = 0.30$) due to deep aerobic respiration. A "Daily Commuter" has a higher weight on rain ($w_r = 0.35$) and travel disruption ($w_t = 0.25$) due to road safety and transit delays.

---

### Category 3: Machine Learning & Time-Series Validation
11. **Q: What was the dataset used to train the ClimateShield ML model?**  
    **A:** 2,232 authentic hourly observations ingested directly from the Open-Meteo Historical Archive API for New Delhi spanning June 1, 2026 to September 1, 2026.

12. **Q: Why is a random `train_test_split` unacceptable for time-series meteorological data?**  
    **A:** Random splitting randomly mixes past and future points. Because weather exhibits high temporal autocorrelation (the temperature at 2 PM is strongly correlated with 1 PM and 3 PM), a model evaluated on randomly mixed data suffers from severe data leakage, inflating accuracy falsely. ClimateShield uses a strict chronological split (first 80% past data for training, last 20% future data for testing).

13. **Q: Which features had the highest feature importance in the Random Forest model?**  
    **A:** Apparent temperature (`feels_like`) contributed 52.4%, precipitation volume contributed 20.2%, WMO weather code contributed 17.2%, and surface wind speed contributed 9.9%.

14. **Q: What is the difference between MAE and RMSE in regression evaluation?**  
    **A:** Mean Absolute Error (MAE) measures the average magnitude of absolute errors in the same units as the target. Root Mean Squared Error (RMSE) squares errors before averaging, penalizing large outlier errors much more severely.

15. **Q: Why compare Random Forest with baseline models like Logistic Regression and Ridge?**  
    **A:** A complex model must always justify its complexity against a simpler baseline. In our evaluation, Ridge Regression achieved an $R^2$ of 0.667 with an MAE of 2.11, while Random Forest Regressor captured non-linear threshold effects, achieving an $R^2$ of 0.996 and an MAE of 0.09.

---

### Category 4: Generative AI & Responsible AI
16. **Q: What is the difference between training an ML model and prompting Gemini?**  
    **A:** Training an ML model updates mathematical model weights (coefficients or decision trees) using historical feature matrices. Prompting Gemini involves passing structured runtime telemetry into a pre-trained Large Language Model using in-context learning to generate natural language explanations without modifying the underlying weights.

17. **Q: How does ClimateShield guard against Gemini hallucinations?**  
    **A:** The prompt strictly injects the deterministic score, verdict, and specific identified hazards as ground-truth facts. Furthermore, the model is instructed to output JSON strictly matching a predefined schema (`summary`, `actionableAdvice`, `keyRisks`).

18. **Q: What happens if the Gemini API key is missing or quota is exhausted?**  
    **A:** The system activates [`generateFallbackAdvice`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/backend/services/geminiService.js). This is an offline deterministic natural language generator that compiles actionable safety checklists and persona advice from rule tables, ensuring 100% uptime for the user.

---

### Category 5: Database & MongoDB Atlas
19. **Q: Why use Mongoose alongside MongoDB?**  
    **A:** MongoDB is schema-less by default. Mongoose provides an Object Data Modeling (ODM) layer that enforces strict schema validation, type safety, default values, pre-save middleware (e.g. bcrypt hashing), and relationship population at the application layer.

20. **Q: Why is an index added to `createdAt: -1` in the `RiskAssessment` schema?**  
    **A:** History queries sort assessments in descending chronological order (newest first). A descending B-tree index on `createdAt` allows MongoDB to satisfy the query via an index scan rather than a full collection scan ($O(\log N)$ vs $O(N)$).

21. **Q: How does ClimateShield handle environments where MongoDB is unreachable?**  
    **A:** [`config/db.js`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/backend/config/db.js) uses a resilient fallback pattern. If `MONGO_URI` is unset or times out, the server logs a notice and directs writes to an encrypted in-memory and local cache, preventing the application from crashing.

---

### Category 6: Authentication & Security
22. **Q: Why should passwords never be stored using simple MD5 or SHA-256?**  
    **A:** Fast hashing algorithms like MD5 or SHA-256 can be computed billions of times per second on modern GPUs, making them vulnerable to rainbow table attacks and brute force. Bcrypt is an intentionally slow, adaptive key derivation function with an internal salt that defends against rainbow table and dictionary attacks.

23. **Q: Why is `select: false` set on the password field in the Mongoose schema?**  
    **A:** `select: false` ensures that standard `User.find()` or `User.findOne()` queries do not return the hashed password by default. It must be explicitly requested with `.select('+password')`, preventing accidental leakage in API responses.

24. **Q: What is stored in the JWT payload and why should sensitive data not be placed there?**  
    **A:** The JWT payload contains non-sensitive claims: user ID, email, name, and expiration timestamp. Because JWT payloads are only Base64Url-encoded (not encrypted), anyone who intercepts the token can decode and read its contents.

25. **Q: What are the security benefits of `helmet` middleware?**  
    **A:** Helmet sets HTTP response headers that protect against common web vulnerabilities, including hiding the `X-Powered-By: Express` header, configuring `X-Content-Type-Options: nosniff`, and setting `X-Frame-Options` to prevent clickjacking.

---

### Category 7: Frontend & UI/UX Engineering
26. **Q: How does the atmospheric canvas maintain 60 FPS performance?**  
    **A:** The particle canvas uses `requestAnimationFrame`, rendering simple vector strokes and circles directly into a 2D canvas context. No React DOM nodes are created or destroyed during particle animation, avoiding React reconciliation overhead.

27. **Q: How does the application support accessibility (`prefers-reduced-motion`)?**  
    **A:** In [`AtmosphericBackground.jsx`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/frontend/src/components/AtmosphericBackground.jsx), `window.matchMedia('(prefers-reduced-motion: reduce)')` is checked. If active, the particle canvas loop is disabled, and CSS animations drop durations to near-zero via media query overrides.

28. **Q: Why are SVG charts used instead of heavy external charting libraries?**  
    **A:** External charting libraries often add 200KB+ to bundle sizes and can introduce React 19 compatibility hurdles. Native SVG renders directly into the DOM, has zero external dependencies, supports full CSS hardware acceleration, and allows precise control over gradients and responsive viewboxes.

---

### Category 8: Deployment & Production Operations
29. **Q: How does Vercel execute the Express backend without a persistent server process?**  
    **A:** Through [`api/index.js`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/api/index.js), the Express `app` instance is exported directly. Vercel wraps the exported app into an ephemeral AWS Lambda / Vercel Serverless Function that spins up on incoming HTTP requests, processes the request, and spins down automatically.

30. **Q: What are the main limitations and future scope of the platform?**  
    **A:** Limitations include reliance on public API rate limits for Open-Meteo and simulated fallback if MongoDB Atlas is offline. Future scope includes integrating hyperlocal IoT LoRaWAN hardware sensors, push notifications for convective storm alerts, and fine-tuning an on-device Edge TPU model for offline edge deployment.
</details>

---

## 🎤 Presentation Scripts

### 🎙️ 2-Minute Presentation Script (Elevator Pitch)
> "Good morning / afternoon. Today, everyone has a weather app on their phone. But traditional weather apps only show raw numbers: 38°C, 70% humidity, AQI poor. Users are still left asking: *'Can I go for a run right now? Is it safe to take my bike to work?'*
> 
> We built **ClimateShield**, a hyperlocal climate risk and decision-support platform that transforms raw environmental data into actionable human decisions.
> 
> The architecture has three key pillars:
> First, our **authoritative deterministic risk engine**. We ingest live temperature, humidity, precipitation, UV, and AQI from Open-Meteo. The engine calculates heat risk, rain risk, air quality risk, and travel disruption, weighting them by the user’s specific profile—whether they are a student commuting to class, a runner doing cardio, or a farmer in the field.
> 
> Second, our **machine learning pipeline**. Rather than guessing, we trained a Random Forest model on over 2,200 real hourly observations from the Open-Meteo archive using strict chronological train/test splits. It predicts future environmental hazard states with a holdout R-squared of 0.996 and an MAE under 0.1.
> 
> Third, our **Responsible AI explanation layer**. We pass structured risk outputs to Google Gemini to synthesize natural language safety checklists and gear advice.
> 
> The UI is designed like a modern atmospheric command center: procedural weather skies that adapt from clear skies to storms, floating frosted glass panels, and interactive risk history charts.
> 
> In summary, ClimateShield doesn't just tell you the weather—it protects your daily life. Thank you."

---

### 🎙️ 5-Minute Technical Presentation Script (Detailed Walkthrough)
> "Respected evaluators, thank you for your time. Today I am presenting **ClimateShield: Hyperlocal Climate Risk & Safety Assistant**.
> 
> ### The Problem
> Every day, millions of people check the weather, see raw indices like 35°C and 80% humidity, and underestimate the danger. High humidity halts sweat evaporation, causing heat stroke, while elevated PM2.5 severely strains the cardiovascular system during exercise. Weather apps inform you; they don't protect you.
> 
> ### Our Solution & Architecture
> ClimateShield is a full-stack, enterprise-grade climate intelligence platform.
> * On the frontend, we use React 19, Vite 8, and vanilla CSS tokens with zero heavy UI bloat. We built an **Atmospheric Engine** that renders procedural skies—clear daylight, rain streaks, storm lightning pulses, and night stars—directly tied to real-time telemetry.
> * On the backend, we run an Express 4 REST API, prepared for Vercel serverless deployment and MongoDB Atlas persistence.
> 
> ### The Dual Intelligence Engine
> What makes ClimateShield unique is our separation of concerns between deterministic mathematics, machine learning, and generative AI:
> 
> 1. **The Deterministic Risk Engine:**
>    Numerical risk must be auditable and reproducible. We compute component scores for thermal heat stress, precipitation volume, particulate AQI, outdoor feasibility, and transit disruption. Then, we apply persona-based multi-criteria weighting. For a fitness enthusiast, air quality carries a 35% weight because deep aerobic exertion multiplies particulate inhalation.
> 
> 2. **The Machine Learning Pipeline:**
>    We do not claim that 'Gemini is our ML model'. Gemini is our generative explanation layer. For genuine machine learning, we ingested 2,232 authentic historical observations from the Open-Meteo Archive API. We engineered time-series features like diurnal cyclical harmonics, thermal gap, and convective storm codes. We trained a Random Forest Regressor and Classifier using a chronological holdout split with zero future data leakage. It achieved an MAE of 0.09 and an R-squared of 0.996, proving strong predictability on holdout atmospheric data.
> 
> 3. **The Gemini Generative AI Layer:**
>    Gemini receives the authoritative risk score as an immutable constraint. It cannot hallucinate the numbers. It generates empathetic, highly actionable briefings: for example, advising an N95 respirator when PM2.5 is high or extra transit buffer time when rain convection is detected. If Gemini is offline, our deterministic fallback synthesizer steps in with zero service interruption.
> 
> ### Key Features Demonstrated
> In the live application:
> * **Hero Command Center:** Features an SVG dynamic radial ring gauge displaying the overall risk score and an explicit explanation answering *'Why does this score exist?'*
> * **Floating Weather Panel:** Shows live temperature, humidity, wind, UV, and a solar arc displaying real sunrise and sunset times.
> * **Horizontal Forecast Timeline:** Provides 24-hour radar and 7-day outlooks tagged with risk categories.
> * **Longitudinal History & Analytics:** Interactive SVG spline charts show Risk Over Time, Temperature vs. Risk, and personal climate insights derived from stored database records.
> * **Security & Authentication:** Includes bcrypt password hashing, JWT Bearer authentication, and personal profile preferences for commute type and air quality sensitivity.
> 
> ClimateShield bridges the gap between raw meteorological telemetry and actionable human safety. Thank you, and I look forward to your questions."

---

## 📄 License
This project is licensed under the ISC License. Developed for climate intelligence and public safety decision support.
