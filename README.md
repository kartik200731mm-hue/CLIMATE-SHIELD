# 🛡️ ClimateShield — Hyperlocal Climate Risk & Safety Assistant

> **Don't just check the weather. Know what to do.**

ClimateShield is a **full-stack climate risk and decision-support application** that goes beyond displaying temperature and rainfall forecasts.

Instead of simply showing:

> Temperature: 38°C | Rain Probability: 70% | AQI: Poor

ClimateShield analyzes environmental conditions and answers a more useful question:

> **"Should I go outside, and what precautions should I take?"**

The system combines **weather data, air-quality data, risk analysis, user context, and AI-assisted recommendations** to provide practical, activity-specific guidance.

---

## 🌍 Problem Statement

Traditional weather applications mainly provide raw environmental information.

Users still have to interpret that information themselves.

For example:

```text
Temperature: 38°C
Humidity: 80%
AQI: Poor
Rain Probability: 70%
```

A user may not immediately know whether they should:

* Attend an outdoor event
* Exercise outside
* Travel
* Cycle
* Go to college
* Change their plans

ClimateShield transforms raw environmental data into an **understandable risk assessment and actionable recommendation**.

---

# 💡 Our Solution

ClimateShield follows this pipeline:

```text
Environmental Data
        ↓
Weather + Air Quality Analysis
        ↓
Risk Calculation Engine
        ↓
Overall Risk Score
        ↓
Activity & User Context
        ↓
Decision Support
        ↓
AI-Assisted Recommendation
```

The goal is to turn **data into decisions**, rather than simply displaying data.

---

# 🚀 Key Features

## 1. 🌡️ Environmental Monitoring

ClimateShield analyzes important environmental parameters including:

* Temperature
* Humidity
* Feels-like temperature
* Rain probability
* Precipitation
* Wind speed
* Air Quality Index
* PM2.5
* PM10

---

## 2. 📊 Climate Risk Score

The system calculates individual risk categories:

```text
🔥 Heat Risk
🌧️ Rain Risk
😷 Air Quality Risk
🚶 Outdoor Activity Risk
🚗 Travel Risk
```

These factors are combined into an overall score:

```text
Overall Risk Score: 72 / 100
Status: HIGH
```

The risk calculation is designed to be **explainable**, so users can understand why a particular risk level was generated.

---

# 🧠 3. Explainable Risk Engine

ClimateShield does not depend entirely on an AI model to determine risk.

A deterministic risk engine evaluates environmental conditions using defined engineering rules and weighted factors.

Example:

```text
IF temperature ≥ 35°C
AND humidity ≥ 70%

→ Heat Risk increases
→ Outdoor Risk increases
```

Similarly:

```text
IF rain probability is high
→ Travel Risk increases
```

and:

```text
IF AQI is poor
→ Air Quality Risk increases
→ Outdoor Activity Risk increases
```

This separation makes the system more **predictable, explainable, and testable**.

---

# 🤖 4. Gemini AI Integration

ClimateShield uses **Google Gemini** as an AI-assisted explanation layer.

The deterministic system first calculates:

```text
Risk Score
Decision
Risk Factors
```

Gemini then converts these results into a concise, user-friendly recommendation.

Example:

```text
Environmental conditions indicate elevated outdoor risk.

Consider avoiding prolonged outdoor activity during the hottest
part of the day and monitor rainfall conditions before travelling.
```

### Important Design Principle

Gemini does **not** independently decide the numerical risk score.

```text
Risk Engine
     ↓
Official System Decision
     ↓
Gemini
     ↓
Natural-language Explanation
```

This makes the AI integration more controlled and explainable.

---

# 👤 5. User Modes

Different users can receive different recommendations from the same environmental conditions.

### 🎓 Student

Useful for:

* College travel
* Outdoor campus activities
* Daily commute

### 🏃 Fitness

Useful for:

* Running
* Walking
* Cycling
* Outdoor workouts

### 🚗 Commuter

Useful for:

* Daily travel
* Road conditions
* Rain-related travel risk

The system can be extended with additional modes such as:

* 🚴 Outdoor Traveller
* 👨‍🌾 Farmer
* 🏕️ Event Planner

---

# 🚦 6. "Should I Go Outside?"

ClimateShield's primary decision-support feature.

The user selects an activity such as:

```text
Go to College
Exercise
Travel
Cycling
Outdoor Event
```

The system evaluates the current environmental conditions and returns:

```text
RECOMMENDED
```

or

```text
CAUTION
```

or

```text
NOT RECOMMENDED
```

along with the main reasons behind the decision.

Example:

```text
NOT RECOMMENDED

Reasons:
✓ High temperature
✓ Poor air quality
✓ High probability of rain
```

---

# 📈 7. Forecast Reliability

A major planned feature of ClimateShield is **forecast reliability analysis**.

Instead of displaying an arbitrary value such as:

```text
"Weather prediction is 80% accurate"
```

ClimateShield aims to evaluate forecast performance using historical data.

The concept:

```text
Forecast Prediction
        ↓
Store Prediction
        ↓
Wait for Actual Observation
        ↓
Compare Prediction vs Reality
        ↓
Calculate Forecast Performance
        ↓
Display Evidence-Based Reliability
```

This prevents the system from presenting an unsupported accuracy percentage.

---

# 🗄️ 8. MongoDB Data Storage

ClimateShield is designed to store risk assessments for historical analysis.

A stored assessment can contain:

```text
Location
Weather Data
Air Quality
User Mode
Activity
Risk Scores
Overall Score
Decision
AI Recommendation
Timestamp
```

This data can later support:

* User history
* Forecast reliability
* Trend analysis
* Risk analytics
* Future machine-learning experiments

---

# 🏗️ System Architecture

```text
                    USER
                      │
                      ▼
              React Frontend
                      │
                  REST API
                      │
                      ▼
             Node.js + Express
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   Weather API     AQI API      MongoDB
        │             │          History
        └──────┬──────┘
               ▼
         Risk Engine
               │
        ┌──────┴──────┐
        ▼             ▼
    Risk Score     Decision
        │             │
        └──────┬──────┘
               ▼
           Gemini AI
               │
               ▼
      Smart Recommendation
               │
               ▼
          React Dashboard
```

---

# 🛠️ Technology Stack

| Layer           | Technology                 |
| --------------- | -------------------------- |
| Frontend        | React                      |
| Build Tool      | Vite                       |
| Backend         | Node.js                    |
| Server          | Express.js                 |
| Database        | MongoDB                    |
| AI              | Google Gemini API          |
| Weather Data    | Open-Meteo                 |
| Air Quality     | Open-Meteo Air Quality API |
| Version Control | Git & GitHub               |

---

# 📁 Project Structure

```text
ClimateShield/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── docs/
│   ├── architecture.md
│   └── review-2.md
│
├── .gitignore
└── README.md
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key

GEMINI_MODEL=your_gemini_model
```

### ⚠️ Security

Never commit `.env` to GitHub.

The `.gitignore` file contains:

```text
.env
node_modules/
dist/
```

API keys should always remain private.

---

# ▶️ Running the Project

## Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ClimateShield
```

---

## Start Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

## Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the frontend URL in the terminal.

---

# 🔌 API Architecture

### Health Check

```http
GET /api/health
```

### Environmental Data

```http
GET /api/weather?latitude=<LAT>&longitude=<LON>
```

### Risk Analysis

```http
POST /api/risk/analyze
```

Example request:

```json
{
  "temperature": 38,
  "humidity": 80,
  "rainProbability": 70,
  "aqi": 120,
  "mode": "student",
  "activity": "college"
}
```

### AI Recommendation

```http
POST /api/ai/recommendation
```

The backend sends validated risk information to Gemini for a natural-language explanation.

---

# 🧮 Risk Calculation Concept

ClimateShield uses multiple risk dimensions instead of relying on a single environmental value.

Conceptually:

```text
Overall Risk
=
Heat Contribution
+
Rain Contribution
+
Air Quality Contribution
+
Outdoor Contribution
+
Travel Contribution
```

The individual components use normalized scores between:

```text
0 → 100
```

with the final result classified into:

```text
LOW
MODERATE
HIGH
SEVERE
```

The thresholds and weights are project-defined engineering assumptions and can be calibrated using historical data in future versions.

---

# 🌱 Social & Environmental Impact

ClimateShield is designed to promote climate awareness and responsible decision-making.

Potential benefits include:

* Better awareness of heat conditions
* Awareness of poor air quality
* Better outdoor planning
* Reduced exposure to unfavorable environmental conditions
* Increased understanding of local climate conditions
* Support for climate-conscious daily decisions

The system is a **decision-support tool**, not a replacement for official emergency alerts or professional advice.

---

# 🔮 Future Enhancements

### Phase 2

* Real-time geolocation
* Interactive maps
* Weather forecast charts
* Historical risk dashboard
* MongoDB user history
* Improved Gemini personalization

### Phase 3

* Forecast reliability measurement
* Forecast-vs-observation database
* Statistical evaluation
* Risk trend visualization

### Phase 4

* Personalized user profiles
* Notification system
* PWA/mobile application
* Hyperlocal alerts
* Advanced ML-based risk prediction

---

# 🎓 Academic Engineering Focus

ClimateShield demonstrates:

### Application of Engineering Principles

* Modular architecture
* Separation of concerns
* API-based system design
* Explainable risk calculation
* Input validation
* Error handling

### Problem Solving

```text
Real-world Problem
       ↓
Environmental Data
       ↓
Data Processing
       ↓
Risk Analysis
       ↓
Decision Support
       ↓
Actionable Recommendation
```

### Modern Tools

* React
* Node.js
* Express
* MongoDB
* Gemini API
* REST APIs
* Git
* GitHub

---

# 👥 Team Development

The project can be developed collaboratively using Git and GitHub.

Suggested responsibilities:

```text
Frontend Team
→ UI, components, responsive design, API integration

Backend Team
→ APIs, database, risk engine, Gemini integration

GitHub / Documentation
→ Repository management, README, issues, documentation and presentation
```

All members should understand the **complete system architecture**, even when working on different modules.

---

# 📌 Project Vision

ClimateShield aims to move from:

> **"What is the weather?"**

to:

> **"What does the current climate condition mean for me?"**

By combining environmental data, explainable risk analysis and AI-assisted recommendations, ClimateShield provides a practical approach to **hyperlocal climate decision support**.

---

## ⭐ Project Status

**Current Status:** Active Development

**Version:** 1.0 MVP

Built for academic evaluation, full-stack development practice, and future expansion into a production-oriented climate intelligence platform.

---

## 📄 License

This project is intended for educational and academic purposes.
