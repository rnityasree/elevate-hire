# ElevateHire 🚀

> **Intelligent Full-Stack Talent Match Engine & High-Priority Event Dispatcher**


[![Live Application](https://img.shields.io/badge/Live_Demo-elevate--hire.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://elevate-hire-ten.vercel.app)
[![API Status](https://img.shields.io/badge/Backend-Render_Live-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://elevate-hire.onrender.com)
[![Database](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

> 🔗 **Live Demo:** [https://elevate-hire-ten.vercel.app](https://elevate-hire-ten.vercel.app)  
> *(Note: The backend runs on a free cloud instance; the initial request may take ~40–50s to wake up if idle).*


ElevateHire is an end-to-end recruitment platform engineered to bridge the gap between graduating engineering students and industry opportunities. By pairing dynamic skill-matching algorithms with an automated multi-channel dispatch pipeline, the platform eliminates communication latency and ensures candidates never miss short-notice interview drives.

---

## 🌟 Key Features

* **Dynamic Skill-Matching Algorithm:** Computes mathematical affinity scores and highlights both matching proficiencies and actionable skill gaps.
* **Dual-Tier Priority Notification Engine:**
* **Standard Window:** Automatically dispatches structured HTML digests via Nodemailer (Gmail SMTP).
* **48-Hour Urgent Window:** Escalates fast-tracked hiring drives to high priority, triggering instant WhatsApp alerts via the Twilio Messaging API.


* **Non-Blocking Asynchronous Architecture:** Background matching and dispatch pipelines execute independently of the primary HTTP lifecycle, maintaining sub-50ms API response times.
* **Role-Based Portals:** Dedicated recruiter interfaces for job scheduling and candidate dashboards with countdown urgency badges and real-time application pipelines.
* **Comprehensive Career Modules:** Integrated support for peer mentorship, marketplace opportunities, video resumes, and international education pathways.

---

## 🏗️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                                PRESENTATION TIER                                  |
|                         React.js (Vite) + Tailwind CSS                            |
|                                                                                   |
|  +---------------------------+                     +---------------------------+  |
|  |      Recruiter Portal     |                     |     Candidate Portal      |  |
|  |  - Job Creation Form      |                     |  - Match Score View       |  |
|  |  - ISO Schedule Picker    |                     |  - Urgent Alert Badges    |  |
|  +---------------------------+                     +---------------------------+  |
+----------------------------------------+------------------------------------------+
                                         |  REST APIs / HTTPS
                                         v
+-----------------------------------------------------------------------------------+
|                                APPLICATION TIER                                   |
|                             Node.js + Express.js                                  |
|                                                                                   |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|  |   Auth & Security     |  |   Matching Engine     |  |  Notification Engine  |  |
|  |  - JWT Middleware     |  |  - Set Affinity Calc  |  |  - Nodemailer (Email) |  |
|  |  - Role Verification  |  |  - Gap Analysis       |  |  - Twilio (WhatsApp)  |  |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
+---------------------+----------------------------------+--------------------------+
                      |                                  |
         Mongoose ODM |                                  | External Webhooks
                      v                                  v
+------------------------------------+  +-------------------------------------------+
|             DATA TIER              |  |         EXTERNAL SERVICES TIER            |
|         MongoDB Atlas              |  |                                           |
|                                    |  |  - Twilio Messaging REST API              |
|  - Users (Candidates / Employers)  |  |    (Verified WhatsApp Template Sandbox)   |
|  - Resumes (Extracted Skills)      |  |  - Gmail SMTP Gateway                     |
|  - Jobs (Postings & Schedules)     |  |  - Google Gemini AI API                   |
+------------------------------------+  +-------------------------------------------+

```

---

## 📊 Evaluation & Benchmarks (N = 100 Test Set)

| Metric | Measured Value | Evaluation Context |
| --- | --- | --- |
| **Accuracy** | **88.00%** | Overall correct qualification classification rate |
| **Precision** | **89.36%** | Correctly qualified candidates among total matches |
| **Recall (Sensitivity)** | **85.71%** | Qualified applicants successfully identified from pool |
| **F1-Score** | **87.50%** | Harmonic mean balancing precision and discovery |
| **DB Query Latency** | **32 ms** | Candidate filtering across array indices |
| **WhatsApp Dispatch Latency** | **420 ms** | Average transit time via Twilio Gateway |
| **API Response Time** | **45 ms** | Non-blocking execution on Node.js event loop |

---

## 🛠️ Technology Stack

* **Frontend:** React 18, Vite, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js, REST APIs
* **Database:** MongoDB Atlas, Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
* **Integrations:** Twilio Messaging API (WhatsApp Business), Nodemailer (Gmail SMTP), Google Gemini API

---

## 📁 Repository Structure

```text
elevate-hire/
├── client/                     # Frontend React application (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI (PostJob, Navbar, Modals)
│   │   ├── layouts/            # Role-based dashboard layouts
│   │   ├── pages/              # Views (Jobs, Dashboard, Profile, VideoResume)
│   │   ├── App.jsx             # Client router and route guards
│   │   └── main.jsx            # React root mount
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Node.js & Express application
│   ├── src/
│   │   ├── controllers/        # Business logic (jobController, abroadController)
│   │   ├── models/             # Mongoose schemas (User, Resume, Job)
│   │   ├── routes/             # Express API routing definitions
│   │   ├── utils/              # Notification engine (Nodemailer + Twilio)
│   │   └── server.js           # Express app bootstrap & DB connection
│   ├── test-trigger.js         # Standalone notification verification script
│   └── package.json
│
├── .gitignore                  # Exclusion rules (node_modules, .env)
└── README.md                   # Project documentation

```

---

## 🚀 Getting Started

### 1. Environment Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Nodemailer
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+14155238886
TWILIO_CONTENT_SID=your_whatsapp_template_id

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

```

### 2. Installation & Run

```bash
# Clone the repository
git clone https://github.com/rnityasree/elevate-hire.git
cd elevate-hire

# Start Backend
cd server
npm install
npm run dev

# Start Frontend (in a new terminal)
cd ../client
npm install
npm run dev

```

---

## 🧪 Isolated Notification Engine Verification

To verify both the SMTP and Twilio WhatsApp pipelines without starting the client UI:

```bash
cd server
node test-trigger.js

```
