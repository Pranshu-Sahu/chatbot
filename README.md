# 💬 Chatbot Web App

A production-ready chatbot web application built with **Next.js (App Router)**, **Tailwind CSS**, and **JWT-based authentication**. The app features a real-time message stream between a user and a dummy AI bot backend.

---

## 🚀 Live Demo
> [(https://chatbot-p31xzpgfd-pranshusahus-projects.vercel.app/login)](https://chatbot-p31xzpgfd-pranshusahus-projects.vercel.app/login)

---

## 🛠 Tech Stack

- ⚛️ **Next.js 15 (App Router)**
- 🎨 **Tailwind CSS**
- 🔐 **JWT Authentication**
- 💬 **Dummy Backend for Chat**
- 🧑‍💻 **TypeScript**
- 📦 **ESLint + Prettier**

---

## 🔑 Core Features

- ✅ Secure Register/Login flow (JWT)
- ✅ Protected chat route (`/chat`)
- ✅ Real-time chat UI with scroll-to-bottom
- ✅ Bot replies from dummy backend
- ✅ Responsive design with dark mode support (WIP)

---

## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/chatbot-app.git

# Navigate into the project
cd chatbot-app

# Install dependencies
npm install

# Start the development server
npm run dev

The app runs at http://localhost:3000
src/
├── app/
│   ├── login/           # /login page
│   ├── register/        # /register page
│   ├── chat/            # /chat page (protected)
│   ├── layout.tsx       # Root layout (theme/auth)
│   ├── page.tsx         # Landing or redirect
├── components/          # Reusable UI components
├── context/             # Auth context
├── hooks/               # Custom hooks
├── lib/                 # Utilities (e.g., auth, API)
├── styles/              # Global styles
├── types/               # TypeScript types


🙋 Author
👨‍💻 Pranshu Sahu

📧 sahupranshu637@gmail.com
