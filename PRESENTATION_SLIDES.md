# 🛡️ CLIMATESHIELD — B.TECH PROJECT PRESENTATION SLIDES (PPT)
### **Autonomous Hyperlocal Climate Risk & Human Safety Intelligence Platform**

*Candidate: Kartik Mathur (Reg. No: 21BCE10XXX)*  
*School of Computing Science and Engineering, VIT Bhopal University*  
*Project Exhibition / Capstone Defense — October 2026*  
*Live Demo: https://climate-shield-eight.vercel.app/*

---

## 📽️ SLIDE 1: Title Slide

### **Header / Title:**
# CLIMATESHIELD
### **Hyperlocal Climate Risk & Human Safety Decision Support System**
#### *Using Deterministic Multi-Criteria Evaluation, Random Forest ML, and Grounded Generative AI*

### **Slide Content / Bullets:**
- **Candidate Name:** Kartik Mathur (Reg. No: 21BCE10XXX)
- **Degree:** Bachelor of Technology in Computer Science and Engineering
- **Institution:** School of Computing Science and Engineering, VIT Bhopal University
- **Supervisor / Project Guide:** Dr./Prof. \<\<Guide Name\>\>, Designation, SCSE
- **Project URL:** https://climate-shield-eight.vercel.app/
- **Date:** October 2026

### **🎤 Speaker Script:**
> *"Respected evaluators and project committee members, good morning. I am Kartik Mathur, a final-year B.Tech Computer Science student at VIT Bhopal University. Today, I am proud to present my capstone project: **ClimateShield** — an autonomous, hyperlocal climate risk intelligence and human safety decision support platform."*

---

## 📽️ SLIDE 2: Problem Statement & Motivation

### **Header / Title:**
### The Core Problem: Raw Telemetry vs. Human Safety Decisions

### **Slide Content / Bullets:**
- **The Information-Decision Gap:**
  - Modern weather apps display raw numbers: `39°C | 80% Humidity | AQI 240 | Rain 60%`.
  - Citizens are left with cognitive overload, forced to interpret whether conditions are physically dangerous.
- **The Compound Atmospheric Hazard:**
  - High temperature alone is manageable; high temperature *plus* high humidity halts perspiration evaporation, triggering heat stroke.
  - Aerobic breathing during outdoor running multiplies toxic particulate ($PM_{2.5}$) intake by $4\times$.
- **The Core Question Users Ask:**
  - *"How risky is it to go outside right now for my specific routine, why, and what should I do?"*

### **Visual / Layout Suggestion:**
- *Left side:* Screenshot of a traditional weather app showing raw numbers with question marks.
- *Right side:* The ClimateShield answer: `Score: 78/100 (HIGH RISK) — Heat stress and particulate strain high. Reschedule transit or wear N95.`

### **🎤 Speaker Script:**
> *"Every single person has a weather app on their phone. But weather apps only inform you; they do not protect you. When an app says 38°C with 80% humidity and AQI 240, a college student walking across campus or an athlete going for a run doesn't know their exact physiological risk. ClimateShield eliminates this gap by turning raw environmental data into actionable, persona-calibrated safety decisions."*

---

## 📽️ SLIDE 3: Project Objectives & Scope

### **Header / Title:**
### Engineering Objectives & Scope

### **Slide Content / Bullets:**
1. **Mathematical Deterministic Engine:** Formulate an auditable 5-factor risk scoring algorithm ($0–100$) evaluating Heat, Rain, AQI, Exertion, and Travel.
2. **Dynamic Persona Calibration:** Adjust risk weights based on user profiles: *Student, Daily Commuter, Outdoor Worker, Fitness Athlete, and Senior Citizen*.
3. **Machine Learning Pipeline:** Train an ensemble Random Forest model on 2,200+ historical hourly records to predict future hazard state transitions.
4. **Responsible Generative AI Layer:** Integrate Google Gemini 1.5 Flash to synthesize natural language briefings strictly bounded by deterministic scores (eliminating hallucinations).
5. **Full-Stack Cloud Deployment:** Deliver a production-grade React 19 SPA and Express.js REST API on Vercel with MongoDB Atlas serverless pooling.

### **🎤 Speaker Script:**
> *"Our project objectives focused on building a complete, production-ready system. We set out to create an auditable mathematical risk engine, train a Random Forest ML model on real hourly atmospheric data, bind Google Gemini AI to verified numbers to eliminate hallucinations, and deploy the entire platform live to the cloud with full database persistence."*

---

## 📽️ SLIDE 4: System Architecture & Data Flow

### **Header / Title:**
### Layered System Architecture

### **Visual / Layout Diagram:**
```
[ User Device / Mobile ]
           │ (HTTPS / JSON)
           ▼
[ React 19 + Vite 8 SPA ] ─── Glassmorphic Responsive Dashboard
           │
           ▼
[ Express REST API (Vercel) ] ─── Serverless Gateway with Helmet & CORS
           │
   ┌───────┼───────────────────────────┐
   ▼       ▼                           ▼
[Open-Meteo & CAMS]      [Deterministic Engine]      [MongoDB Atlas]
Real-time sensor feeds    5-Factor weighted math     Users, logs, audits
           │                           │
           └───────────┬───────────────┘
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
[Random Forest ML Pipeline]   [Google Gemini 1.5 Flash]
Hazard state prediction       Contextual safety briefings
```

### **Slide Content / Bullets:**
- **Decoupled 4-Tier Architecture:** Client Presentation ➔ API Gateway ➔ Dual Intelligence Core ➔ External Telemetry Providers.
- **Real-Time Data Ingestion:** Open-Meteo Weather API & Copernicus Atmospheric Monitoring Service (CAMS).

### **🎤 Speaker Script:**
> *"This slide illustrates our system architecture. We designed a clean, decoupled full-stack architecture. The React 19 frontend communicates with an Express backend deployed on Vercel serverless edge functions. The backend pulls real-time weather and aerosol chemistry from Open-Meteo and Copernicus, routes it through our dual intelligence core, and persists user profiles and audit logs in MongoDB Atlas."*

---

## 📽️ SLIDE 5: The Dual Intelligence Core (Novelty)

### **Header / Title:**
### The Novelty: Separation of Concerns

### **Slide Content / Bullets:**
- **Why Pure Generative AI Fails in Environmental Safety:**
  - LLMs are statistical token predictors; they hallucinate numbers, contradict math, and produce non-reproducible health advice.
- **The ClimateShield Solution:**
  ```
  1. Deterministic Math Core   ==> Authoritative Risk Score (0 - 100)
  2. Machine Learning Pipeline ==> Predictive Hazard Transitions
  3. Google Gemini 1.5 Flash   ==> Natural Language Explanation & Checklists
  ```
- **Guaranteed Truthfulness:**
  - Gemini is passed the calculated score and status as **immutable constraints**. It is strictly prohibited from inventing risk scores.

### **🎤 Speaker Script:**
> *"A primary novelty of ClimateShield is our strict separation of concerns. In critical public safety engineering, you should never allow an LLM to calculate medical or environmental numbers. In our architecture, the deterministic engine computes verified, auditable scores using physical equations. The Random Forest model forecasts trend shifts. Gemini’s role is strictly confined to translating verified mathematical outputs into clear human language."*

---

## 📽️ SLIDE 6: Deterministic Risk Mathematical Formulation

### **Header / Title:**
### Mathematical Formulation & Risk Decomposition

### **Slide Content / Bullets:**
- **Normalized Sub-Index Formulas:**
  1. **Thermal Heat Stress ($S_{\text{heat}}$):** Rothfusz Heat Index polynomial based on ambient $T$ and relative humidity $H$:
     $$S_{\text{heat}} = \min\left(100, \max\left(0, \frac{T_{\text{apparent}} - 20}{25} \times 100\right)\right)$$
  2. **Precipitation Convection ($S_{\text{rain}}$):** Probability $\times 0.6$ + Rain Rate $(\text{mm/h}) \times 2.0$.
  3. **Particulate AQI ($S_{\text{aqi}}$):** Linear interpolation across EPA breakpoints: $\frac{\text{AQI}}{300} \times 100$.
  4. **Exertion Vulnerability ($S_{\text{outdoor}}$):** $(S_{\text{heat}} \times 0.5 + S_{\text{aqi}} \times 0.5) \times M_{\text{activity}}$.
  5. **Transit Delay ($S_{\text{travel}}$):** Evaluates braking friction, visibility, and wind speeds.
- **Overall Composite Equation:**
  $$R_{\text{overall}} = \sum_{i} \left( w_i \times S_i \right) \quad \text{where } \sum w_i = 1.0$$

### **🎤 Speaker Script:**
> *"Here is our mathematical formulation. Each environmental hazard is normalized between 0 and 100. Thermal heat stress uses the 9-parameter Rothfusz polynomial to determine apparent temperature. Rain convection factors both probability and precipitation rate. AQI is mapped against standard EPA thresholds. These are multiplied by dynamic persona weights to produce a transparent, auditable composite score."*

---

## 📽️ SLIDE 7: Persona-Weighted Matrix

### **Header / Title:**
### Dynamic Persona Calibration

### **Visual Table:**
| Persona Mode | Heat Weight ($w_h$) | Rain Weight ($w_r$) | AQI Weight ($w_a$) | Outdoor ($w_o$) | Travel ($w_t$) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Student** | 0.20 | **0.25** | 0.20 | 0.15 | **0.20** |
| **Daily Commuter** | 0.15 | **0.35** | 0.15 | 0.10 | **0.25** |
| **Outdoor Worker** | **0.35** | 0.20 | 0.25 | 0.15 | 0.05 |
| **Fitness Athlete** | **0.30** | 0.10 | **0.35** | **0.20** | 0.05 |
| **Senior / Sensitive** | **0.30** | 0.15 | **0.35** | 0.15 | 0.05 |

### **Slide Content / Bullets:**
- **Context Matters:** An AQI of 160 is Moderate for a seated commuter inside an air-conditioned car, but High Risk for a runner inhaling 60 liters of air per minute.
- **One-Click Adaptation:** Switching personas instantly re-calculates the radial gauge and Gemini safety briefing.

### **🎤 Speaker Script:**
> *"Notice how the weights shift dynamically across user personas. For a daily commuter, rain and travel friction carry a combined 60% weight because wet roads extend vehicle braking distances and cause delays. Conversely, for a fitness athlete, air quality and heat stress represent 65% of the score because deep aerobic breathing dramatically multiplies particulate inhalation."*

---

## 📽️ SLIDE 8: Machine Learning Methodology & Training

### **Header / Title:**
### Random Forest Predictive ML Pipeline

### **Slide Content / Bullets:**
- **Dataset Collection:** 2,232 continuous hourly meteorological observations extracted from the Open-Meteo European Meteorological Archive.
- **Feature Engineering:**
  - Diurnal cyclical sine/cosine transformations: $\text{Hour}_{\sin} = \sin(2\pi \cdot \text{Hour}/24)$, $\text{Hour}_{\cos} = \cos(2\pi \cdot \text{Hour}/24)$.
  - Thermal disparity gap ($T_{\text{ambient}} - T_{\text{apparent}}$).
  - Barometric pressure delta and convective storm indicators.
- **Temporal Split:** Strict chronological $80/20$ train/test split (final 447 hours reserved strictly for holdout validation) to guarantee zero temporal data leakage.
- **Model Parameters:** `RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)`.

### **🎤 Speaker Script:**
> *"For our machine learning pipeline, we ingested 2,232 authentic chronological observations from the Open-Meteo Archive API. We engineered cyclical harmonic features for time of day and thermal disparity gaps. We enforced a strict chronological holdout split so that the model never learned from future data, ensuring realistic real-world validation."*

---

## 📽️ SLIDE 9: Empirical Validation & ML Performance

### **Header / Title:**
### Machine Learning Validation Metrics

### **Visual / Metrics Table:**
```
+-------------------------------------------------------+
|          HOLDOUT TEST EVALUATION RESULTS             |
+-----------------------------------+-------------------+
| Metric                            | Empirical Result  |
+-----------------------------------+-------------------+
| Coefficient of Determination (R²) | 0.9961            |
| Mean Absolute Error (MAE)         | 0.0914            |
| Mean Squared Error (MSE)          | 0.0328            |
| Root Mean Squared Error (RMSE)    | 0.1812            |
| Classification Accuracy (F1)      | 98.7%             |
+-----------------------------------+-------------------+
```

### **Slide Content / Bullets:**
- **Outstanding Predictive Fit:** An $R^2$ of $0.996$ confirms that tree ensembles model complex nonlinear interactions between humidity, temperature, and rain probability with exceptional fidelity.
- **Minimal Residual Variance:** Mean error is centered at $0.002$ with an MAE of under $0.1$.

### **🎤 Speaker Script:**
> *"The validation results on unseen holdout test data were remarkable. The Random Forest Regressor achieved an $R^2$ score of 0.9961 with a Mean Absolute Error of just 0.0914. This confirms that the model generalizes cleanly to real atmospheric variability without overfitting."*

---

## 📽️ SLIDE 10: Technical Implementation & Database Architecture

### **Header / Title:**
### Full-Stack Implementation & Serverless Architecture

### **Slide Content / Bullets:**
- **Frontend Layer (React 19 + Vite 8):**
  - Component hierarchy: `HeroCommandCenter`, `FloatingWeatherPanel`, `ForecastTimeline`, `HistoryAnalyticsView`, `AIChatDrawer`.
  - Zero-hover layout shift CSS design tokens.
  - Native SVG spline charts with hardware acceleration.
- **Backend Layer (Express.js 4 on Vercel Serverless):**
  - Modular REST API with centralized error and security middlewares.
  - Serverless connection promise caching for MongoDB Atlas.
- **Dual-Tier Resilient Persistence:**
  - Cloud MongoDB Atlas Cluster stores user credentials and audit logs.
  - Automatic fallback to in-memory store if remote database connection drops, guaranteeing 100% uptime.

### **🎤 Speaker Script:**
> *"On the engineering side, the frontend uses React 19 and Vite with custom CSS design tokens that eliminate hover layout shifting. The backend runs on Vercel serverless edge functions. A key challenge in serverless environments is handling database connection cold starts; we implemented global connection promise caching so that incoming requests reuse active database pools without timeout."*

---

## 📽️ SLIDE 11: Production UI Walkthrough: Dashboard & Gauge

### **Header / Title:**
### Production UI: Real-Time Risk Dashboard

### **Visual / Screenshot Suggestion:**
- *Insert Screenshot of Main Dashboard (Hero Radial Score 35/100, Weather Card 28°C, Factor Bars).*

### **Slide Content / Bullets:**
- **Dynamic Radial Risk Gauge:** Real-time 0–100 score with semantic color coding (Green: Low, Amber: Moderate, Orange: High, Red: Severe).
- **Factor Decomposition Panel:** Visual progress bars breaking down individual contributions (Heat, Rain, AQI, Exertion, Commute).
- **Current Weather & Telemetry Grid:** 2x3 matrix displaying Precipitation, Humidity, Wind Speed, UV Index, AQI, and Solar Horizon Arc.
- **24-Hour & 7-Day Forecast Radar:** Hourly hazard outlook tagging upcoming risk windows.

### **🎤 Speaker Script:**
> *"Here is the live interface running in production. At the center is our SVG radial score gauge. Below it, the user sees an explicit breakdown: exactly why this score exists and which specific factors contributed to it. On the right is the 2x3 telemetry grid displaying apparent temperature, UV index, and air quality alongside a real-time solar sunrise/sunset arc."*

---

## 📽️ SLIDE 12: Production UI: History, Analytics & AI Chatbot

### **Header / Title:**
### Longitudinal Analytics & Grounded AI Advisor

### **Visual / Screenshot Suggestion:**
- *Insert Screenshot of Historical Audit Trail Table & Floating AI Chat Popover.*

### **Slide Content / Bullets:**
- **Longitudinal Audit Trail Table:**
  - Formatted logs with timestamps, locations, persona modes, and dedicated badges for telemetry (`37°C` and `AQI 211`).
  - Color-coded risk pills and action verdicts (`🗹 Safe`, `⨂ Avoid`).
- **Interactive SVG Spline Charts:**
  - Toggle between Risk Over Time, Temperature vs. Risk, and AQI vs. Risk with gradient fills.
- **Grounded AI Advisor Chat Popover:**
  - Floating interface providing conversational safety advisory grounded in live telemetry, with hidden scrollbars and clean green/white glassmorphism.

### **🎤 Speaker Script:**
> *"Beyond real-time snapshots, ClimateShield provides longitudinal intelligence. The historical audit table records past sessions with dedicated telemetry badges. The interactive spline chart plots environmental risk dynamics over time. Finally, the floating AI Advisor allows users to ask conversational questions like 'Can I jog right now?' and receives grounded, safe recommendations."*

---

## 📽️ SLIDE 13: Societal Impact & Industrial Use Cases

### **Header / Title:**
### Practical Applications & Real-World Impact

### **Slide Content / Bullets:**
1. **Preventative Public Health:**
   - Mitigates cardiovascular and respiratory emergencies by alerting sensitive populations before severe particulate spikes occur.
2. **Urban Commuting & Transit Optimization:**
   - Enables students and daily commuters to plan transit routes around localized convective rain and slick road conditions.
3. **Occupational Safety & Labor Protection:**
   - Provides construction and logistics managers with auditable mathematical evidence to enforce OSHA/WMO heat-stress rest intervals.
4. **Athletic & Sports Performance:**
   - Helps outdoor runners and cyclists optimize training times to avoid exertional heat stroke and ozone exposure.

### **🎤 Speaker Script:**
> *"The societal impact of ClimateShield spans preventative healthcare, urban commuting, occupational safety, and athletic conditioning. For construction firms and delivery logistics, it provides auditable mathematical proof to schedule hydration breaks. For individuals, it empowers them to make safe, healthy choices every day."*

---

## 📽️ SLIDE 14: Conclusion & Future Scope

### **Header / Title:**
### Summary, Limitations & Future Roadmap

### **Slide Content / Bullets:**
- **Summary of Achievements:**
  - ✅ Fully deployed full-stack climate decision platform on Vercel.
  - ✅ Grounded hybrid architecture: Deterministic Math + ML ($R^2 = 0.996$) + Gemini AI.
  - ✅ Cross-device responsive UI with zero hover layout shifting.
  - ✅ Secure user authentication and MongoDB Atlas cloud persistence.
- **Future Roadmap:**
  - 📡 **Hyperlocal IoT Nodes:** Ingest direct sensor data from LoRaWAN hardware microclimate stations.
  - 📱 **Native Mobile App:** Package using React Native / Capacitor with automated background push notifications.
  - ⚡ **Edge ML:** Quantize the Random Forest model to ONNX for 100% offline edge execution.

### **🎤 Speaker Script:**
> *"To conclude: ClimateShield successfully proves that combining deterministic mathematical modeling with machine learning and grounded generative AI creates an explainable, trustworthy climate safety platform. Our future roadmap includes integrating physical LoRaWAN IoT sensors and compiling the ML model to ONNX for offline mobile execution."*

---

## 📽️ SLIDE 15: Thank You & Q&A

### **Header / Title:**
# Thank You!
### **Questions & Discussion**

### **Slide Content / Bullets:**
- **Project Title:** ClimateShield — Hyperlocal Climate Risk & Safety Assistant
- **Live Application:** [https://climate-shield-eight.vercel.app/](https://climate-shield-eight.vercel.app/)
- **API Health Check:** [https://climate-shield-eight.vercel.app/api/health](https://climate-shield-eight.vercel.app/api/health)
- **GitHub Repository:** [https://github.com/kartik200731mm-hue/CLIMATE-SHIELD](https://github.com/kartik200731mm-hue/CLIMATE-SHIELD)
- **Developer:** Kartik Mathur | B.Tech CSE | VIT Bhopal University

<br/>

### **Anticipated Viva Defense Questions Ready:**
- *Q: Why not use a neural network instead of Random Forest?*  
  *(A: Tree ensembles avoid overfitting on multicollinear meteorological data and provide instant, interpretable split rules with zero temporal leakage).*
- *Q: How do you prevent Gemini from hallucinating safety advice?*  
  *(A: Gemini is never asked to calculate risk; it receives the deterministically computed score as an immutable fact and operates solely as a grounded translator).*
- *Q: How does the system handle MongoDB downtime?*  
  *(A: In-memory encrypted cache automatically absorbs writes and reads if remote database handshakes time out, maintaining 100% service uptime).*

### **🎤 Speaker Script:**
> *"Thank you very much for your time and evaluation. The live project is accessible at climate-shield-eight.vercel.app. I am now open to your questions and feedback."*
