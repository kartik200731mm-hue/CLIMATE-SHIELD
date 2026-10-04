<div align="center">

# 🛡️ CLIMATESHIELD
### **Autonomous Hyperlocal Climate Risk & Human Safety Intelligence Platform**

> *"Don't just check the weather. Know if it's safe to go outside, why, and what specific actions to take."*

<br/>

[![Live Production Demo](https://img.shields.io/badge/🌐_Live_Demo-climate--shield--eight.vercel.app-2F6654?style=for-the-badge&logo=vercel&logoColor=white)](https://climate-shield-eight.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/📦_GitHub_Repo-CLIMATE--SHIELD-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kartik200731mm-hue/CLIMATE-SHIELD)
[![API Status](https://img.shields.io/badge/⚡_API_Status-Online_200_OK-4EA94B?style=for-the-badge)](https://climate-shield-eight.vercel.app/api/health)

<br/>

[![React 19](https://img.shields.io/badge/React_19-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js_20-Express_4-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud_Cluster-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Scikit-Learn](https://img.shields.io/badge/ML_Pipeline-Random_Forest-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Vercel Serverless](https://img.shields.io/badge/Deployment-Vercel_Serverless-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

<br/>

**[🚀 Launch Live Application](https://climate-shield-eight.vercel.app/)** • **[📑 API Health Check](https://climate-shield-eight.vercel.app/api/health)** • **[👨‍💻 Developer Profile](#-developer--contact)**

---

</div>

<br/>

## 📌 Executive Summary

Most consumer weather platforms provide raw, disconnected meteorological metrics:
```
Temperature: 39°C  │  Humidity: 78%  │  AQI: 240 (Unhealthy)  │  Rain: 60%  │  UV: 8.5
```
Users are forced to perform mental calculations to answer practical questions:
- *“Is it safe for me to go running right now?”*
- *“Will high humidity combined with poor AQI cause heat stress during my commute?”*
- *“What specific protective gear or transit adjustments are required?”*

**ClimateShield** solves this by unifying **real-time atmospheric telemetry**, **deterministic multi-criteria mathematical risk models**, **Random Forest machine learning**, and **Google Gemini Generative AI** into an actionable, persona-calibrated safety command dashboard.

---

## 🌟 Key Highlights & Capabilities

- 🎯 **Persona-Calibrated Risk Engine**: Dynamic weight adjustments for **Students, Commuters, Outdoor Workers, Athletes, and Sensitive Health Profiles**.
- 🧮 **5-Factor Mathematical Decomposition**: Real-time evaluation across **Thermal Heat Stress, Rain Convection, Aerosol Particulate AQI, Physical Exertion, and Transit Disruption**.
- 🌲 **Predictive Machine Learning**: Scikit-Learn Random Forest Regressor & Classifier trained on 2,200+ historical hourly records ($R^2 = 0.996$).
- 🤖 **Grounded Sovereign AI Briefings**: Google Gemini AI synthesis strictly bound by deterministic scores to eliminate hallucinations.
- 📡 **Live Real-World Telemetry**: Continuous sensor stream ingestion from Open-Meteo & Copernicus CAMS APIs.
- 📊 **Longitudinal Intelligence**: Interactive SVG risk-over-time trend splines and historical audit trail logging.
- 🔐 **Secure Authentication**: Bcrypt password hashing, JWT bearer authorization, and persona profile persistence.
- ⚡ **Zero-Downtime Architecture**: Dual-layer database resilience (MongoDB Atlas Cloud + in-memory persistent cache fallback).

---

## 🏗️ System Architecture

```
                               ┌─────────────────────────────────────────┐
                               │       Client Browser (Desktop/Mobile)   │
                               │        React 19 • Vite 8 • Vanilla CSS  │
                               └────────────────────┬────────────────────┘
                                                    │ (HTTPS / JSON)
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │   Vercel Serverless REST API Gateway    │
                               │        Node.js • Express 4 Framework    │
                               └────────────────────┬────────────────────┘
                                                    │
        ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
        │                                           │                                           │
        ▼                                           ▼                                           ▼
┌───────────────────────┐               ┌───────────────────────┐               ┌───────────────────────┐
│ Live Meteorological   │               │ Atmospheric Aerosol   │               │ MongoDB Atlas Cloud   │
│ Telemetry (Open-Meteo)│               │ Chemistry (Copernicus)│               │ (Users, Logs, Audits) │
└───────────┬───────────┘               └───────────┬───────────┘               └───────────────────────┘
            │                                       │
            └───────────────────┬───────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │ Deterministic Risk    │
                    │ Mathematical Core     │
                    └───────────┬───────────┘
                                │
            ┌───────────────────┴───────────────────┐
            ▼                                       ▼
┌───────────────────────────────┐       ┌───────────────────────────────┐
│ Machine Learning Pipeline     │       │ Google Gemini Generative AI   │
│ Random Forest Regressor       │       │ Grounded Contextual Synthesis │
└───────────────┬───────────────┘       └───────────────┬───────────────┘
                │                                       │
                └───────────────────┬───────────────────┘
                                    ▼
                        ┌───────────────────────┐
                        │ Unified Risk Verdict  │
                        │ & Actionable Guidance │
                        └───────────────────────┘
```

---

## 🧮 Multi-Criteria Mathematical Risk Engine

To guarantee 100% auditable and explainable results, ClimateShield computes risk scores mathematically using real physical equations before passing them to AI:

$$R_{\text{total}} = \sum_{i} \left( w_i \times S_i \right) \times M_{\text{activity}} \times M_{\text{persona}}$$

### Evaluation Dimensions:

| Dimension | Formula / Inputs | Impact Thresholds |
| :--- | :--- | :--- |
| **🌡️ Thermal Heat Stress** | Rothfusz Heat Index regression using Temperature & Relative Humidity | `> 40°C Apparent`: High Strain |
| **🌧️ Precipitation & Convection** | Rain Probability (%) $\times$ Hourly Precipitation Rate (mm/h) | `> 50% / > 5mm`: Elevated Friction |
| **🌫️ Particulate Air Quality** | Breakpoint interpolation across PM2.5, PM10, $NO_2$, and $O_3$ | `AQI > 150`: Severe Respiratory Hazard |
| **🚶 Physical Exertion Load** | Metabolic Equivalent of Task (MET) adjusted for heat & air quality | Aerobic cardio doubles particulate intake |
| **🚗 Commute & Transit Buffer** | Visibility impairment, road traction loss, and convective delay factors | Braking distances and schedule buffers |

---

## 🤖 Architectural Separation of Concerns

```
┌───────────────────────────────────────────────────────────────────────────┐
│                       RESPONSIBILITY MATRIX                               │
├───────────────────────────┬───────────────────────────────────────────────┤
│ 1. Deterministic Engine   │ Authoritative mathematical risk computation   │
│ 2. Machine Learning       │ Predictive hazard state forecasting           │
│ 3. Google Gemini AI       │ Contextual, empathetic human safety advice    │
│ 4. React 19 Frontend      │ High-performance glassmorphic visualization   │
└───────────────────────────┴───────────────────────────────────────────────┘
```

> **Why this matters for engineering**: LLMs are never permitted to generate or hallucinate safety numbers. The mathematical engine establishes hard numeric constraints, and Gemini converts those verified numbers into natural, actionable human guidance.

---

## 🛠️ Complete Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend UI** | React 19, Vite 8, Vanilla CSS (Design Tokens, Glassmorphism, Zero-Hover Shift), Lucide React, Axios |
| **Backend API** | Node.js, Express.js, RESTful Architecture, Helmet, CORS, Express-Rate-Limit |
| **Database & Auth** | MongoDB Atlas, Mongoose (Serverless Connection Pooling), JWT (JSON Web Tokens), Bcrypt.js |
| **Artificial Intelligence** | Google Gemini AI (`gemini-1.5-flash`), Google Generative AI SDK |
| **Machine Learning** | Python, Scikit-Learn (Random Forest Regressor/Classifier), Pandas, NumPy |
| **Data Providers** | Open-Meteo Weather API, Copernicus Atmospheric Monitoring Service (CAMS) |
| **DevOps & Cloud** | Vercel (Frontend & Serverless Cloud Functions), Git, GitHub |

---

## 🔌 REST API Documentation

Base URL: **`https://climate-shield-eight.vercel.app/api`**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Server status, MongoDB pool state, Gemini config | No |
| `GET` | `/` | API catalog and route directory | No |
| `GET` | `/weather?lat={lat}&lon={lon}` | Real-time weather, 24h forecast & air quality | No |
| `POST` | `/risk/evaluate` | Full multi-criteria deterministic risk assessment | No |
| `POST` | `/risk/ml-predict` | Random Forest hazard prediction | No |
| `POST` | `/ai/explain` | Grounded Gemini contextual briefing | No |
| `POST` | `/ai/chat` | Conversational environmental safety assistant | No |
| `POST` | `/auth/register` | Create user account with persona preferences | No |
| `POST` | `/auth/login` | Authenticate user and return JWT bearer token | No |
| `GET` | `/auth/me` | Fetch active user profile and preferences | **Yes** |
| `GET` | `/history` | Retrieve user climate audit trail & history | No |

---

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kartik200731mm-hue/CLIMATE-SHIELD.git
cd CLIMATE-SHIELD
```

### 2. Configure Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start backend server:
```bash
npm run dev
# Server running at: http://localhost:5000
```

### 3. Configure Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
# Frontend running at: http://localhost:5173
```

---

## ☁️ Production Deployment on Vercel

The repository is pre-configured with a unified [`vercel.json`](file:///c:/Users/Asus/Downloads/CLIMATE%20SHIELD/vercel.json) deploying both the React SPA and Express Serverless API together:

1. Import the repository in [Vercel](https://vercel.com).
2. Set Framework Preset to **Vite** and Root Directory to `./`.
3. Add Environment Variables: `GEMINI_API_KEY`, `MONGO_URI`, `JWT_SECRET`.
4. Deploy!

---

## 👨‍💻 Developer & Project Author

<br/>

<div align="center">

### **Kartik Mathur**
**B.Tech in Computer Science & Engineering**  
*VIT Bhopal University*

[![Portfolio / LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/kartik-mathur)
[![GitHub](https://img.shields.io/badge/GitHub-kartik200731mm--hue-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kartik200731mm-hue)
[![Live Project](https://img.shields.io/badge/Live_Site-ClimateShield-2F6654?style=for-the-badge&logo=vercel&logoColor=white)](https://climate-shield-eight.vercel.app/)

</div>

---

## 📄 License

This project is licensed under the **ISC License**. Developed for environmental safety intelligence and decision support.
