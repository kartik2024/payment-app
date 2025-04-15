# 💸 Payment App

A simple yet powerful payment application built with **React** (frontend) and **Express** (backend), focusing on secure and consistent transaction handling using **session-based database transactions**.

## 🚀 Features

- User registration & login
- Create and manage payments
- Secure transactions with DB sessions
- API-driven architecture
- Built with MongoDB for persistence

## 🛠️ Tech Stack

- **Frontend:** React, Axios, Tailwind (optional)
- **Backend:** Express, Node.js
- **Database:** MongoDB (with Mongoose)
- **Auth:** JWT or session-based (your choice)
- **Docker-ready** (if applicable)

## 🧩 Transaction Logic

Transactions are handled using MongoDB **sessions**, ensuring atomicity and consistency. If any step in the payment flow fails, the entire transaction is rolled back.

## 📦 Installation

### Backend

```bash
cd backend
npm install
npm start
