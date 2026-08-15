# Collabify

**Where Skills Meet Ideas.**

Collabify is a full-stack social collaboration platform that helps students, developers, designers, and creators discover project ideas, build teams based on complementary skills, and bring ideas to life together.

## 🚀 Features

- **Authentication** — Register, login, JWT-based sessions, protected routes
- **Profiles** — Skills, education, experience, GitHub/LinkedIn links, profile picture upload
- **Project Discovery** — Create, search, filter, and browse collaborative projects
- **Team Management** — Send/accept/reject join requests, manage team members
- **Social Feed** — Posts, likes, comments, follows
- **Real-Time Chat** — Team chat powered by Socket.io with online status
- **Notifications** — Real-time updates for join requests, likes, comments, and follows
- **Dashboard** — Personal overview of projects, requests, and activity

## 🛠 Tech Stack

**Frontend:** React (Vite), React Router
**Backend:** Node.js, Express.js
**Database:** MongoDB (Atlas), Mongoose
**Real-Time:** Socket.io
**Auth:** JWT, bcrypt.js
**File Uploads:** Multer

## 📁 Project Structure

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account (free tier works)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Moazam80/collabify.git
cd collabify
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file in `backend/` with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running Locally

Open two terminals:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📌 Project Status

MVP complete — core features implemented and tested. Built as a structured, phase-by-phase learning project covering full-stack development from planning to deployment.

## 👤 Author

Built by Moazam Ali