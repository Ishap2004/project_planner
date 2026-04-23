# 🚀 Student Life Planner

A professional, full-stack Student Life Planner designed to help students manage their daily tasks and self-care routines. This project was developed as part of the **PROG2500 - Open-Source Full Stack Development** course.

---

## 🌐 Live Demo

You can access the live version of the application here: **[Student Life Planner Live Demo](https://project-planner-pjve.onrender.com)**

---

## 🌟 Key Features

- **Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Task Management**: Full CRUD functionality for student tasks with categorization (Study, Work, Personal).
- **Daily Routines**: Manage recurring habits like meals and breaks with scheduled times.
- **Premium UI**: Modern, responsive dashboard with glassmorphism, smooth animations, and a sophisticated dark mode.
- **Real-time Feedback**: Instant UI updates and interactive task toggling.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Axios, Lucide-React, React Router DOM.
- **Backend**: Node.js, Express.
- **Database**: MySQL (Hosted on Aiven).
- **Security**: JWT for session management, Bcrypt for password hashing.
- **Styling**: Vanilla CSS with modern Design Tokens.

## 🎓 Course Mapping (CLOs)

This project successfully implements all Course Learning Outcomes:

- **CLO1 (Backend)**: Built a scalable RESTful API using Node.js and Express.
- **CLO2 (Database)**: Integrated persistent MySQL storage for all user data.
- **CLO3 (Frontend)**: Developed a dynamic, component-based SPA using React.
- **CLO4 (Integration)**: Connected the React frontend to the Express backend via a Vite proxy.
- **CLO5 (Security)**: Implemented authentication and authorization best practices.
- **CLO6 (Deployment)**: Configured for cloud deployment with continuous integrity checks.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ishap2004/project_planner.git
   cd project_planner
   ```

2. **Backend Setup**:
   - Install dependencies: `npm install`
   - Configure `.env`:
     ```env
     DB_HOST=your_host
     DB_USER=your_user
     DB_PASS=your_pass
     DB_NAME=your_db
     JWT_SECRET=your_secret
     ```
   - Start Server: `npm run dev`

3. **Frontend Setup**:
   - Navigate to frontend: `cd frontend`
   - Install dependencies: `npm install`
   - Start Vite: `npm run dev`

4. **Access the App**:
   Navigate to `http://localhost:5173` in your browser.

---

## 📅 Sprint 3: Integration Highlights

- **Seamless API Connectivity**: All frontend actions trigger robust backend updates.
- **Protected Routing**: Dashboard access is restricted to authenticated users.
- **Data Consistency**: Fixed `due_date` and registration bugs for a flawless user experience.
- **Aesthetic Overhaul**: Upgraded from basic CSS to a high-end, professional UI.

---

**Developed by Ishap2004**  
*Conestoga College*  
*Winter 2026*