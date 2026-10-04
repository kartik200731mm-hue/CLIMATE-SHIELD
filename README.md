# ClimateShield 🌍
### Hyperlocal Climate Risk & Safety Assistant
> **Understand Your Environment. Act Before Risk Becomes Reality.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel_Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://climate-shield-eight.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kartik200731mm-hue/CLIMATE-SHIELD)
[![React](https://img.shields.io/badge/React_19-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Synthesis-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

ClimateShield is a full-stack climate safety web application that converts real-world meteorological and environmental data into practical climate risk assessments and actionable safety recommendations.

Instead of only displaying raw weather numbers like temperature, rainfall, or AQI, ClimateShield evaluates these signals together to answer the question that truly matters:
> **“How risky are the current environmental conditions, and what specific actions should I take?”**

🔗 **Live Application**: [https://climate-shield-eight.vercel.app/](https://climate-shield-eight.vercel.app/)  
🔗 **GitHub Repository**: [https://github.com/kartik200731mm-hue/CLIMATE-SHIELD](https://github.com/kartik200731mm-hue/CLIMATE-SHIELD)

---

## 👨‍💻 About This Project

I built **ClimateShield** as an end-to-end full-stack project to demonstrate how real-world environmental data, robust backend engineering, machine learning models, and generative AI can be integrated into one cohesive, production-grade product.

### Core Highlights:
- 📱 **Responsive Web Dashboard**: Atmospheric UI built with React 19, Vite, and custom CSS design tokens.
- 📡 **Real-Time Telemetry**: Live sensor ingestion of temperature, humidity, precipitation, UV, wind, and AQI via Open-Meteo.
- 🧮 **Deterministic Risk Engine**: Explainable, mathematical 5-factor risk decomposition.
- 🌲 **Machine Learning Pipeline**: Random Forest prediction model trained on real hourly environmental records.
- 🤖 **Google Gemini AI Synthesis**: Contextual natural-language safety briefings grounded in deterministic calculations.
- 🔐 **Authentication & Security**: JWT token authentication with Bcrypt password encryption.
- 🗄️ **MongoDB Atlas Persistence**: Cloud database integration with resilient local fallback for zero-downtime reliability.
- 📊 **Longitudinal History & Analytics**: Interactive SVG trend charts and audit trail logs.
- ⚡ **Production Cloud Deployment**: Deployed and operational on Vercel.

---

## 🎯 Problem Statement

Most traditional weather applications primarily display isolated raw numbers:
```
Temperature: 38°C  |  Humidity: 80%  |  Rain Probability: 70%  |  AQI: 220 (Poor)
```

The problem is that **users have to manually interpret these values themselves**. High humidity impairs sweat evaporation, accelerating heat stroke, while elevated PM2.5 severely strains the cardiovascular system during exercise.

A user may look at these numbers and still wonder:
> **"Is it actually safe for me to go outside for college, running, or commute right now?"**

ClimateShield bridges this gap by combining multiple environmental signals into an actionable decision pipeline:

$$\text{Environmental Signals} \longrightarrow \text{Risk Decomposition} \longrightarrow \text{AI Explanation} \longrightarrow \text{Actionable Steps}$$

---

## 💡 What ClimateShield Does

ClimateShield continuously evaluates environmental conditions across key hazard dimensions:

| Risk Category | Focus & Evaluation Parameter |
| :--- | :--- |
| 🌡️ **Heat Risk** | Thermal stress, apparent temperature, and solar convective load |
| 🌧️ **Rain Risk** | Precipitation probability, rainfall volume, and commute friction |
| 🌫️ **Air Quality Risk** | Fine particulate matter (PM2.5, PM10) and AQI category impact |
| 🚶 **Outdoor Risk** | Physical exertion vulnerability calibrated to the active persona |
| 🚗 **Travel Risk** | Roadway visibility, braking buffers, and transit disruption |
| 🌍 **Overall Risk** | Multi-criteria weighted composite score (**0 – 100**) |

---

## 🧠 System Architecture

```
                               ┌────────────────────────┐
                               │   User Browser (Client)│
                               └───────────┬────────────┘
                                           │
                                           ▼
                               ┌────────────────────────┐
                               │ React 19 + Vite UI     │
                               └───────────┬────────────┘
                                           │ (REST API / JSON)
                                           ▼
                               ┌────────────────────────┐
                               │ Node.js / Express API  │
                               └───────────┬────────────┘
                                           │
        ┌──────────────────────────────────┼──────────────────────────────────┐
        ▼                                  ▼                                  ▼
┌────────────────┐                ┌─────────────────┐                ┌─────────────────┐
│ Weather Sensor │                │ Air Quality PM  │                │ MongoDB Atlas   │
│ Telemetry API  │                │ Chemistry API   │                │ (User Auth/Log) │
└───────┬────────┘                └────────┬────────┘                └─────────────────┘
        │                                  │
        └─────────────────┬────────────────┘
                          ▼
              ┌────────────────────────┐
              │ Deterministic Risk     │
              │ Multi-Factor Engine    │
              └───────────┬────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
┌───────────────────────┐   ┌───────────────────────┐
│ Random Forest Model   │   │ Google Gemini AI      │
│ (ML Hazard Prediction)│   │ (Grounded Briefings)  │
└───────────┬───────────┘   └───────────┬───────────┘
            │                           │
            └─────────────┬─────────────┘
                          ▼
              ┌────────────────────────┐
              │ Personalized Dashboard │
              │ & Actionable Decisions │
              └────────────────────────┘
```

---

## ⚙️ Core Technical Flow

1. **Location Selection**: User searches or selects a target city/coordinates.
2. **Telemetry Ingestion**: Backend queries Open-Meteo for real-time weather and aerosol chemistry.
3. **Risk Decomposition**: Deterministic engine computes scores for Heat, Rain, Air, Exertion, and Travel.
4. **Persona Weighting**: Weights are dynamically adjusted based on user mode (Student, Commuter, Athlete, Sensitive).
5. **ML Prediction**: Random Forest model evaluates predictive hazard state.
6. **Gemini AI Grounding**: Generates structured, empathetic safety instructions using deterministic scores as constraints.
7. **Frontend Delivery**: Reactive UI updates risk gauges, weather cards, forecast timelines, and history trails.

---

## 🧮 Climate Risk Engine & Architecture Separation

A key architectural design principle in ClimateShield is the **strict separation of responsibilities**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RESPONSIBILITY MATRIX                           │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 1. Deterministic Engine  │ Authoritative mathematical risk computation │
│ 2. Machine Learning      │ Time-series environmental hazard prediction │
│ 3. Generative Gemini AI  │ Human-readable advice & natural explanation │
│ 4. React Frontend        │ Dynamic visualization & user interaction    │
└──────────────────────────┴─────────────────────────────────────────────┘
```

> **Why this matters**: Generative AI is never allowed to hallucinate risk numbers. The mathematical engine produces auditable, reproducible scores, while Gemini translates those verified numbers into clear human advice.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, Vite
- **Styling**: Vanilla CSS with custom Design Tokens (Glassmorphism, Zero-Hover-Shift, Responsive Grid)
- **Icons**: Lucide React
- **HTTP Client**: Axios / Fetch API

### Backend & API
- **Runtime**: Node.js & Express.js
- **Architecture**: RESTful API, Serverless Architecture on Vercel
- **Security**: JWT Bearer Tokens, Bcrypt password hashing, Helmet, CORS

### Database & Cloud
- **Database**: MongoDB Atlas Cloud Cluster
- **ORM / ODM**: Mongoose with serverless connection pooling
- **Resilience**: In-memory persistent cache fallback for zero downtime

### AI & Machine Learning
- **Generative AI**: Google Gemini AI (`gemini-1.5-flash`)
- **Machine Learning**: Scikit-Learn Random Forest Regressor & Classifier
- **Data Pipeline**: Python training workflow on 2,200+ hourly atmospheric records

### Deployment & Tooling
- **Deployment Platform**: Vercel (Frontend & Serverless Functions)
- **Version Control**: Git & GitHub

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend server & database health check |
| `GET` | `/api` | REST API catalog and documentation |
| `GET` | `/api/weather?lat={lat}&lon={lon}` | Real-time weather, forecast & air quality |
| `POST` | `/api/risk/evaluate` | Comprehensive multi-factor climate risk evaluation |
| `POST` | `/api/risk/ml-predict` | Machine learning hazard prediction |
| `POST` | `/api/ai/explain` | Grounded Gemini AI natural language safety briefing |
| `POST` | `/api/ai/chat` | Conversational environmental safety assistant |
| `POST` | `/api/auth/register` | Register new account with persona preferences |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token |
| `GET` | `/api/history` | Retrieve user audit trail and recorded logs |

---

## 🚀 Running the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/kartik200731mm-hue/CLIMATE-SHIELD.git
cd CLIMATE-SHIELD
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_jwt_key
```

### 5. Start the Development Servers
In the `backend/` folder:
```bash
npm run dev
```
In the `frontend/` folder:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🧑‍💻 Developer & Project Owner

**Kartik Mathur**  
*B.Tech in Computer Science & Engineering*  
*VIT Bhopal University*  

- **Focus Areas**: Full-Stack Development, Generative AI Integration, AI Agents, Machine Learning, System Design.
- **GitHub**: [@kartik200731mm-hue](https://github.com/kartik200731mm-hue)
- **Live Project**: [https://climate-shield-eight.vercel.app/](https://climate-shield-eight.vercel.app/)

---

## 📄 License
This project is licensed under the **ISC License**. Developed for environmental safety intelligence and decision support.
