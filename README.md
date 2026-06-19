<div align="center">

#  TradeArena

### Full-Stack Virtual Stock Market Simulator Powered by Spring Boot, React & MySQL

<br/>

[![License](https://img.shields.io/badge/License-MIT-0d1117?style=for-the-badge\&labelColor=f97316\&color=0d1117)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-0d1117?style=for-the-badge\&labelColor=22c55e\&color=0d1117)](#)
[![React](https://img.shields.io/badge/React-Frontend-0d1117?style=for-the-badge\&logo=react\&logoColor=white\&labelColor=61DAFB\&color=0d1117)](https://react.dev)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-0d1117?style=for-the-badge\&logo=springboot\&logoColor=white\&labelColor=6DB33F\&color=0d1117)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-Database-0d1117?style=for-the-badge\&logo=mysql\&logoColor=white\&labelColor=4479A1\&color=0d1117)](https://www.mysql.com)

<br/>

> *A full-stack virtual trading platform that enables users to participate in stock market simulations, join seasonal trading competitions, buy and sell virtual stocks, track portfolio performance, view transaction history, analyze stock movements, and compete on leaderboards in a risk-free environment.*

<br/>

[**✦ Features**](#-features) ·
[**✦ Architecture**](#️-architecture) ·
[**✦ Quick Start**](#-quick-start) ·
[**✦ API Reference**](#-api-reference) ·
[**✦ Tech Stack**](#️-tech-stack)

</div>


## ✨ Features

<br/>

### 📈 Virtual Trading Engine

| Capability             | Description                              |
| ---------------------- | ---------------------------------------- |
| Stock Trading          | Buy and sell virtual stocks in real time |
| Portfolio Management   | Track holdings, investments and returns  |
| Wallet System          | Manage season-wise virtual cash balances |
| Transaction Tracking   | View complete trade history              |
| Profit & Loss Analysis | Calculate gains and losses automatically |

<br/>

### 🏆 Competitive Trading Seasons

<br/>

➤ Join multiple trading competitions

➤ Season-specific portfolios and wallets

➤ Active, Upcoming and Completed seasons

➤ Season switching support

➤ Independent performance tracking per season

<br/>

### 📊 Portfolio Analytics Dashboard

| Capability                | Description                                  |
| ------------------------- | -------------------------------------------- |
| Portfolio Overview        | View current holdings and investment summary |
| Cash Balance Tracking     | Monitor available trading capital            |
| Performance Metrics       | Analyze portfolio growth and returns         |
| Holdings Breakdown        | Detailed stock-wise portfolio view           |
| Trading Activity Insights | Monitor recent trading behavior              |

<br/>

### 📋 Leaderboards & Rankings

<br/>

➤ Real-time participant rankings

➤ Total portfolio value tracking

➤ Profit & loss based competition

➤ Season-wise performance comparison

➤ Top trader identification

<br/>

### 📈 Stock Market Simulation

| Capability             | Description                           |
| ---------------------- | ------------------------------------- |
| Dynamic Stock Prices   | Simulated market price fluctuations   |
| Price History Tracking | View historical stock price movements |
| Random Market Events   | Admin-triggered market movements      |
| Stock Search           | Find stocks by symbol or company name |
| Market Monitoring      | Track stock performance over time     |

<br/>

### 🛠️ Administrative Control Center

<br/>

➤ Manage trading seasons

➤ Create and manage stocks

➤ Update stock prices

➤ Simulate market movements

➤ Monitor user activity

➤ View platform statistics

➤ Activate and complete seasons

➤ Manage trading competitions

<br/>

### 🔐 Authentication & Security

| Capability                | Description                         |
| ------------------------- | ----------------------------------- |
| User Registration         | Create trading accounts securely    |
| JWT Authentication        | Token-based authentication system   |
| Role-Based Access Control | Separate User and Admin permissions |
| Protected Routes          | Restricts unauthorized page access  |
| Session Persistence       | Maintains authenticated sessions    |
| Secure API Access         | Protected backend endpoints         |

<br/>

### 📜 Trading History System

| Capability                 | Description                              |
| -------------------------- | ---------------------------------------- |
| Transaction Logging        | Records all buy and sell activities      |
| Stock Price History        | Maintains historical stock price changes |
| Historical Analysis        | View previous market movements           |
| Audit Trail                | Complete trade tracking                  |
| Chronological Records      | Time-based trading history               |
| Market Activity Monitoring | Observe stock performance over time      |

<br/>

### ⚙️ Market Administration Suite

| Capability                  | Description                           |
| --------------------------- | ------------------------------------- |
| Individual Price Updates    | Modify specific stock prices          |
| Market-Wide Simulation      | Trigger random market movements       |
| Stock Lifecycle Management  | Create, update and remove stocks      |
| Season Lifecycle Management | Control competition status            |
| Platform Monitoring         | Track users, trades and market volume |
| Administrative Dashboard    | Centralized management interface      |

---

## 🏗️ Architecture

<br/>

```text
╔══════════════════════════════════════════════════════╗
║                    USER LAYER                        ║
║            Browser / Desktop / Mobile App           ║
╚═══════════════════════╤══════════════════════════════╝
                        │
                        ▼
╔══════════════════════════════════════════════════════╗
║                  REACT FRONTEND                     ║
║    User Dashboard · Admin Panel · Trading UI        ║
╚══════╤══════════════╤══════════════╤════════════════╝
       │              │              │
       ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ User       │ │ Trading    │ │ Admin      │
│ Module     │ │ Module     │ │ Module     │
└─────┬──────┘ └─────┬──────┘ └─────┬──────┘
      │              │              │
      └──────────────┼──────────────┘
                     │
                     ▼
╔══════════════════════════════════════════════════════╗
║                SPRING BOOT BACKEND                  ║
║      REST APIs · JWT Security · Business Logic      ║
╚══════╤══════════════╤══════════════╤════════════════╝
       │              │              │
       ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Auth       │ │ Trading    │ │ Admin      │
│ Service    │ │ Service    │ │ Service    │
└─────┬──────┘ └────────────┘ └─────┬──────┘
      │                             │
      └──────────────┬──────────────┘
                     │
                     ▼
┌────────────────────────────────────────────┐
│                MYSQL DATABASE              │
│ Users · Stocks · Seasons · Wallets         │
│ Portfolio · Transactions · Price History   │
└────────────────────────────────────────────┘

```

<br/>

### Service Map

| Service                | Stack                 | Responsibility                              |
| ---------------------- | --------------------- | ------------------------------------------- |
| User Interface         | React + Vite          | Dashboard rendering and trading interaction |
| Trading Dashboard      | React                 | Portfolio, wallet and market overview       |
| Stock Trading Engine   | Spring Boot           | Buy and sell stock processing               |
| Portfolio Manager      | Spring Boot           | Holdings and investment tracking            |
| Season Management      | Spring Boot           | Trading competition lifecycle management    |
| Leaderboard Engine     | Spring Boot           | Ranking and performance calculations        |
| Authentication Service | Spring Security + JWT | User authentication and authorization       |
| Admin Control Center   | React + Spring Boot   | Stock and season administration             |
| Backend API            | Spring Boot           | REST APIs and business logic                |
| Data Persistence Layer | Spring Data JPA       | Database access and entity management       |
| Database               | MySQL                 | Users, stocks, portfolios and transactions  |

---

## 🚀 Quick Start

### Prerequisites

```bash
Java >= 17
Node.js >= 18
npm >= 9
MySQL >= 8
Maven >= 3.9
```

You'll also need:

* Git
* MySQL Server
* Modern Web Browser (Chrome / Edge / Firefox)

<br/>

### 1 — Clone

```bash
git clone https://github.com/YOUR_USERNAME/TradeArena.git

cd TradeArena
```

<br/>

### 2 — Backend Setup

```bash
cd backend

mvn clean install
```

<br/>

### 3 — Configure Database

Create a MySQL database:

```sql
CREATE DATABASE tradearena;
```

Update:

```text
backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tradearena
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

<br/>

### 4 — Start Backend Server

```bash
cd backend

mvn spring-boot:run
```

Expected:

```text
✓ Spring Boot Started
✓ MySQL Connected
✓ Backend Running on http://localhost:8080
```

<br/>

### 5 — Frontend Setup

```bash
cd frontend

npm install
```

<br/>

### 6 — Start Frontend

```bash
npm run dev
```

Expected:

```text
VITE v7.x ready

➜ Local: http://localhost:5173/
```

<br/>

### 7 — Open Application

Visit:

```text
http://localhost:5173
```

Register a new account or login to start participating in virtual stock market competitions.

<br/>

### Available Features

```text
✓ User Registration & Login
✓ JWT Authentication
✓ Role-Based Access Control
✓ Virtual Stock Trading
✓ Buy Stocks
✓ Sell Stocks
✓ Portfolio Management
✓ Wallet Management
✓ Multi-Season Trading Competitions
✓ Season Switching
✓ Leaderboard Rankings
✓ Transaction History
✓ Stock Price History
✓ Profit & Loss Tracking
✓ Admin Dashboard
✓ Stock Management
✓ Season Management
✓ Market Simulation
✓ Random Price Updates
```

<br/>

> Application running? Continue to the API Reference section below.

<br/>

---

## 📡 API Reference

<br/>

### Authentication Services

```text
POST  /api/auth/register                 → User Registration

POST  /api/auth/login                    → User Login
```

### User Services

```text
GET   /api/user/profile                  → User Profile Information
```

### Stock Services

```text
GET   /api/stocks                        → Get All Stocks

POST  /api/stocks                        → Create Stock

PUT   /api/stocks/{id}                   → Update Stock

DELETE /api/stocks/{id}                  → Delete Stock

PUT   /api/stocks/{id}/random-price      → Random Stock Price Update

PUT   /api/stocks/random-prices          → Market-Wide Price Update
```

### Trading Services

```text
POST  /api/trade/buy                     → Buy Stock

POST  /api/trade/sell                    → Sell Stock

GET   /api/trade/portfolio/{userId}/{seasonId}
                                         → Portfolio Holdings

GET   /api/trade/transactions/{userId}/{seasonId}
                                         → Transaction History

GET   /api/trade/leaderboard/{seasonId}
                                         → Season Leaderboard
```

### Season Services

```text
GET   /api/seasons                       → Get All Seasons

POST  /api/seasons                       → Create Season

PUT   /api/seasons/{id}                  → Update Season

DELETE /api/seasons/{id}                 → Delete Season
```

### Wallet Services

```text
POST  /api/wallet/create/{userId}/{seasonId}
                                         → Create Season Wallet

GET   /api/wallet/{userId}/{seasonId}
                                         → Wallet Details
```

### Stock History Services

```text
GET   /api/stocks/{stockId}/price-history
                                         → Stock Price History
```

### Sample Requests

```text
Register New User

Login User

Join Trading Season

Buy 10 Shares of TCS

Sell 5 Shares of INFY

View Portfolio

View Leaderboard

View Stock Price History

Trigger Market Simulation
```

### Sample Buy Request

```json
{
  "userId": 1,
  "seasonId": 2,
  "stockId": 1,
  "quantity": 10
}
```

### Sample Portfolio Response

```json
{
  "symbol": "TCS",
  "stockName": "Tata Consultancy Services",
  "quantity": 10,
  "averageBuyPrice": 4200.0,
  "currentPrice": 4350.0,
  "profitLoss": 1500.0
}
```

<br/>

---
## 🛠 Tech Stack

<br/>

<div align="center">

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square\&logo=vite\&logoColor=white)
![React Router](https://img.shields.io/badge/React-Router-CA4245?style=flat-square\&logo=reactrouter\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square\&logo=css3\&logoColor=white)

### Backend

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square\&logo=openjdk\&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring-Boot-6DB33F?style=flat-square\&logo=springboot\&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring-Security-6DB33F?style=flat-square\&logo=springsecurity\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square\&logo=apachemaven\&logoColor=white)

### Database

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square\&logo=mysql\&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring-Data-JPA-6DB33F?style=flat-square)

### Development & Deployment

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square\&logo=github\&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square\&logo=npm\&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square\&logo=postman\&logoColor=white)

### Core Modules

![Trading Engine](https://img.shields.io/badge/Trading-Engine-1DB954?style=flat-square)

![Portfolio Management](https://img.shields.io/badge/Portfolio-Management-2563EB?style=flat-square)

![Season Management](https://img.shields.io/badge/Season-Management-7C3AED?style=flat-square)

![Leaderboard System](https://img.shields.io/badge/Leaderboard-System-D97706?style=flat-square)

![Stock History](https://img.shields.io/badge/Stock-History-EC4899?style=flat-square)

![Wallet Management](https://img.shields.io/badge/Wallet-Management-059669?style=flat-square)

![Market Simulation](https://img.shields.io/badge/Market-Simulation-E11D48?style=flat-square)

![Admin Dashboard](https://img.shields.io/badge/Admin-Dashboard-9333EA?style=flat-square)

</div>

<br/>

---
## 📂 Project Structure

```text
TradeArena/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/tradearena/backend/
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── UserController.java
│   │   │   │   ├── StockController.java
│   │   │   │   ├── TradeController.java
│   │   │   │   ├── SeasonController.java
│   │   │   │   └── AdminController.java
│   │   │   │
│   │   │   ├── entity/
│   │   │   │   ├── User.java
│   │   │   │   ├── Stock.java
│   │   │   │   ├── Wallet.java
│   │   │   │   ├── Portfolio.java
│   │   │   │   ├── Season.java
│   │   │   │   ├── Transaction.java
│   │   │   │   └── StockPriceHistory.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   ├── security/
│   │   │   └── BackendApplication.java
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   ├── pom.xml
│   └── target/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   │
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── App.css
│       │
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── UserDashboard.jsx
│       │   ├── Stocks.jsx
│       │   ├── Portfolio.jsx
│       │   ├── Transactions.jsx
│       │   ├── Leaderboard.jsx
│       │   ├── Seasons.jsx
│       │   ├── StockHistory.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── AdminSeasons.jsx
│       │   └── AdminStocks.jsx
│       │
│       ├── components/
│       │   ├── UserHeader.jsx
│       │   ├── SeasonSelector.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       └── styles/
│           └── *.css
│
├── README.md
├── .gitignore
└── LICENSE
```

<br/>

---

## OUTPUT SCREENSHOTS

### REGISTER & LOGIN PAGE
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/bdd73472-6088-43f8-9ec8-da384a4e582a" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/e8030b36-e4f0-44da-8da7-ffacfe8285df" />

### USER PAGE
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/2fe49853-4127-4a05-81d9-ff1da2a014e5" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/c9827328-5975-4d2d-b3c7-fc6ac560e88f" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/ba432e15-abe8-4dd6-9e6f-53bc4d328842" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/6a4a1477-87e3-4734-8f6c-52c12cf3d87e" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/85490443-d0fa-48ed-8e04-0aac1740b3ae" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/fecfbf32-081e-4959-a205-aa5bb227e603" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/2ddba091-91a5-44e9-a8e6-66dfd57d3aea" />

### ADMIN PAGE
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/d80f753e-01be-4b78-8842-e45c1fa21c08" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/b557a1ea-f460-4064-ba13-396ab8cf3c57" />
<img width="1918" height="855" alt="image" src="https://github.com/user-attachments/assets/a3579f61-40d3-49f6-a8e6-7b840246cf47" />





